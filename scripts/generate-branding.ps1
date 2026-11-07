param([string]$OutputDirectory = "$PSScriptRoot/branding")
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null
$glyphs = @{
 S=@('01110','10001','10000','01110','00001','10001','01110')
 T=@('11111','00100','00100','00100','00100','00100','00100')
 E=@('11111','10000','10000','11110','10000','10000','11111')
 A=@('01110','10001','10001','11111','10001','10001','10001')
 D=@('11110','10001','10001','10001','10001','10001','11110')
 Y=@('10001','10001','01010','00100','00100','00100','00100')
}
$points = [System.Collections.Generic.List[object]]::new()
function Add-Glyph([string]$Letter,[double]$X,[double]$Y,[double]$Step,[bool]$Accent) {
 for($row=0;$row -lt 7;$row++) {
  for($col=0;$col -lt 5;$col++) {
   if($glyphs[$Letter][$row][$col] -ne '1') {continue}
   $red = $Accent -and ((($row -eq 0) -and ($col -in @(2,3))) -or (($row -eq 3) -and ($col -eq 1)) -or (($row -eq 6) -and ($col -in @(1,2))))
   $points.Add(@{x=$X+($col+.5)*$Step;y=$Y+($row+.5)*$Step;r=$Step*.34;red=$red})
  }
 }
}
Add-Glyph 'S' 349.5 170 65 $true
$word='STEADY'
for($i=0;$i -lt $word.Length;$i++) {Add-Glyph ([string]$word[$i]) (267+$i*84) 710 14 ($i -eq 0)}

function Render-Png([string]$Name,[int]$Size,[bool]$Opaque,[bool]$Monochrome,[double]$Scale) {
 $bitmap=[System.Drawing.Bitmap]::new(2048,2048,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
 $graphics=[System.Drawing.Graphics]::FromImage($bitmap)
 $graphics.SmoothingMode=[System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
 if($Opaque) {$graphics.Clear([System.Drawing.Color]::Black)} else {$graphics.Clear([System.Drawing.Color]::Transparent)}
 $white=[System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
 $red=[System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(239,41,41))
 foreach($point in $points) {
  $x=512+($point.x-512)*$Scale; $y=512+($point.y-512)*$Scale; $r=$point.r*$Scale
  $brush=if($point.red -and !$Monochrome){$red}else{$white}
  $graphics.FillEllipse($brush,[single](($x-$r)*2),[single](($y-$r)*2),[single]($r*4),[single]($r*4))
 }
 $pixelFormat=if($Opaque){[System.Drawing.Imaging.PixelFormat]::Format24bppRgb}else{[System.Drawing.Imaging.PixelFormat]::Format32bppArgb}
 $result=[System.Drawing.Bitmap]::new($Size,$Size,$pixelFormat)
 $resize=[System.Drawing.Graphics]::FromImage($result)
 $resize.CompositingMode=[System.Drawing.Drawing2D.CompositingMode]::SourceCopy
 $resize.InterpolationMode=[System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
 $resize.PixelOffsetMode=[System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
 $resize.DrawImage($bitmap,0,0,$Size,$Size)
 $result.Save((Join-Path $OutputDirectory $Name),[System.Drawing.Imaging.ImageFormat]::Png)
 $resize.Dispose();$result.Dispose();$red.Dispose();$white.Dispose();$graphics.Dispose();$bitmap.Dispose()
}
Render-Png 'steady-icon.png' 1024 $true $false 1
Render-Png 'steady-adaptive-foreground.png' 1024 $false $false .76
Render-Png 'steady-monochrome.png' 1024 $false $true .76
Render-Png 'steady-splash.png' 1024 $false $false 1
Render-Png 'steady-favicon.png' 64 $true $false 1
$svg=[System.Text.StringBuilder]::new()
[void]$svg.AppendLine('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">')
foreach($point in $points){
 $color=if($point.red){'#ef2929'}else{'#ffffff'}
 [void]$svg.AppendLine(('<circle cx="{0}" cy="{1}" r="{2}" fill="{3}"/>' -f $point.x,$point.y,$point.r,$color))
}
[void]$svg.AppendLine('</svg>')
Set-Content -LiteralPath (Join-Path $OutputDirectory 'steady-logo.svg') -Value $svg.ToString() -Encoding utf8
Write-Output "Created six branding assets in $OutputDirectory"
