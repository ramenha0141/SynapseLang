@echo off
cd /d %~dp0
node --experimental-specifier-resolution=node ../dist/synac -- %*