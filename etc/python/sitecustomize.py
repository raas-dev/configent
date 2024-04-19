# configent (https://github.com/raas-dev/configent)
# One command automated macOS/Linux laptop/VM/container bootstrapper.
#
# Copyright(C) 2016- Anssi Syrjäsalo (http://a.syrjasalo.com)
# Licensed under GNU Lesser General Public License v3 (LGPL-3.0).

def strtobool(val):
    """Convert a string representation of truth to true (1) or false (0).
    True values are 'y', 'yes', 't', 'true', 'on', and '1'; false values
    are 'n', 'no', 'f', 'false', 'off', and '0'.  Raises ValueError if
    'val' is anything else.
    """
    val = val.lower()
    if val in ('y', 'yes', 't', 'true', 'on', '1'):
        return 1
    elif val in ('n', 'no', 'f', 'false', 'off', '0'):
        return 0
    else:
        raise ValueError("invalid truth value %r" % (val,))

try:
    from rich.traceback import install
    import os
    if strtobool(os.environ.get("RICH_TRACEBACKS")):
        install(show_locals=strtobool(os.environ.get("RICH_SHOW_LOCALS")))
except ModuleNotFoundError:
    pass
