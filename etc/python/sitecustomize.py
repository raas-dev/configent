
# configent (https://github.com/raas-dev/configent)
# One command automated macOS/Linux laptop/VM/container bootstrapper.
#
# Copyright(C) 2016- Anssi Syrjäsalo (http://a.syrjasalo.com)
# Licensed under GNU Lesser General Public License v3 (LGPL-3.0).

try:
    from rich.traceback import install
    import os
    if os.environ.get("RICH_TRACEBACKS") == "1":
        show_locals_bool = os.environ.get("RICH_SHOW_LOCALS") == "1"
        install(show_locals=show_locals_bool)
except ModuleNotFoundError:
    pass
