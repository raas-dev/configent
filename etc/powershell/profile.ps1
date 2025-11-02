# Starship
if (Get-Command starship -ErrorAction SilentlyContinue) {
  $env:STARSHIP_CONFIG = "$HOME/.config/starship.toml"
  Invoke-Expression (&starship init powershell)
}

# Carapace
if (Get-Command carapace -ErrorAction SilentlyContinue) {
  Set-PSReadLineOption -Colors @{ "Selection" = "`e[7m" }
  Set-PSReadlineKeyHandler -Key Tab -Function MenuComplete
  carapace _carapace | Out-String | Invoke-Expression
}
