"-- Vundle --------------------------------------------------------------------

" Required for Vundle
set nocompatible
filetype off

" Suppress error messages in batch/non-interactive mode (e.g., when running +PluginInstall)
if !has('gui_running') && !has('nvim')
  " Redirect error messages to /dev/null in batch mode
  set verbose=0
  set report=9999
endif

set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

" Plugin manager
Plugin 'VundleVim/Vundle.vim'

" Settings
Plugin 'tpope/vim-sensible'
Plugin 'editorconfig/editorconfig-vim'

" Editor
Plugin 'bronson/vim-trailing-whitespace'
Plugin 'godlygeek/tabular'
Plugin 'scrooloose/nerdcommenter'
Plugin 'scrooloose/syntastic'
Plugin 'Yggdroot/indentLine'

" Navigation
Plugin 'ctrlpvim/ctrlp.vim'
Plugin 'scrooloose/nerdtree'
Plugin 'jistr/vim-nerdtree-tabs'
Plugin 'Xuyuanp/nerdtree-git-plugin'
Plugin 'majutsushi/tagbar'
Plugin 'christoomey/vim-tmux-navigator'

" Theme
Plugin 'ayu-theme/ayu-vim'
Plugin 'ryanoasis/vim-devicons'
Plugin 'bling/vim-airline'
Plugin 'vim-airline/vim-airline-themes'

" git
Plugin 'airblade/vim-gitgutter'
Plugin 'tpope/vim-fugitive'

" HTML
Plugin 'ap/vim-css-color'
Plugin 'mattn/emmet-vim'
Plugin 'tpope/vim-surround'

" Language support
Plugin 'chrisbra/csv.vim'
Plugin 'ekalinin/Dockerfile.vim'
Plugin 'elzr/vim-json'
Plugin 'tpope/vim-markdown'

call vundle#end()
filetype plugin indent on

"-- Mouse ----------------------------------------------------------------------

set mouse=a                     " enable mouse in all modes
set ttymouse=xterm2             " allow resizing panels using mouse

"-- Clipboard ------------------------------------------------------------------

set clipboard^=unnamed,unnamedplus
set pastetoggle=<F2>
set go+=a              " visual selection automatically copied to the clipboard

"-- General --------------------------------------------------------------------

set hidden                      " hide buffers instead of closing them
set ttyfast                     " smoother changes
set lazyredraw                  " don't draw unless necessary
set title                       " try to show the filename in the terminal title
set shortmess=aTItoO            " disable the splash-screen
set viminfo='500,f1,:100,/100   " history settings
set visualbell t_vb=            " turn off error sound/flash
set novisualbell                " turn off visual bell
set noerrorbells                " disable error bells

syntax on                       " use syntax highlighting
set fileformats=unix,dos,mac    " try to detect line endings of the file

set showmode                    " display editing mode
set showcmd                     " display possible commands when tab is pressed
set history=50                  " make command history longer
set wildmenu
set wildmode=longest:full,full
set wildignore+=*.log,*.obj,*.o,*.jpg,*.png,*.gif,*.swp

set nostartofline               " don't jump to the first column when scrolling
set scrolloff=20                " keep n lines around cursor when scrolling vertically
set sidescrolloff=10            " keep n columns around cursor when scrolling horizontally

set tabstop=2                   " number of spaces for a tab
set softtabstop=2               " number of spaces to insert when tab/backspace
set shiftwidth=2                " number of spaces to insert on indent
set smarttab                    " uses shiftwidth instead of tabstop at s.o.l
set expandtab                   " expand tabs to spaces
set backspace=indent,eol,start  " enable backspace for these actions
set list listchars=tab:»·,trail:·
set colorcolumn=80

set number                      " display line numbers
set relativenumber

set foldlevel=100               " fold nothing by default
set foldcolumn=1                " the width of the fold column

set showmatch                   " show brace matches
set matchpairs+=<:>             " include angle brackets into brace matches
set matchtime=5                 " how many 0.1s to blink for
set iskeyword+=_,$,@,%,#,-      " disable these as word dividers

set hlsearch                    " highlight matching searches
set incsearch                   " move cursor to the matched string
set ignorecase                  " ignore case when searching
set smartcase                   " don't ignore case if already uppercase

set nowrap                      " no wrap by default
set whichwrap+=<,>,[,]          " wrap also when using arrow keys

set autoindent                  " indentation settings
set nosmartindent
set nocindent

set nobackup                    " don't keep backup after close
set writebackup                 " do keep a backup while working

set backupdir=~/.vim/backups
set directory=~/.vim/swaps

set tags=./tags

set undofile
set undodir=~/.vim/undo

"-- Autoreload vim configs after changes ---------------------------------------

augroup myvimrc
    au!
    au BufWritePost .vimrc,_vimrc,vimrc,.gvimrc,_gvimrc,gvimrc so $MYVIMRC | if has('gui_running') | so $MYGVIMRC | endif
augroup END

set autoread

"-- UI -------------------------------------------------------------------------

set background=dark
set termguicolors
let ayucolor="dark"
colorscheme ayu

" make the statusbar more informative
if has("statusline")
  set laststatus=2
  set statusline=\ \ %F%m%r%h%w\ %=[%Y]\ (%{&ff},\ %{&enc})\ \{%v,\ %l/%L\}\ \ %p%%\
endif

"-- Custom mappings ------------------------------------------------------------

" tab to indent and shift+tab to unindent also when in visual mode
vnoremap <silent> <Tab> >gv
vnoremap <silent> <S-Tab> <gv

" fast buffer switching
nnoremap <silent> <Tab> :bnext<CR>
nnoremap <silent> <S-Tab> :bprevious<CR>

" clear highlighting on escape in normal mode
nnoremap <silent> <esc> :noh<return><esc>
nnoremap <silent> <esc>^[ <esc>^[

"-- vim-airline ----------------------------------------------------------------

let g:airline_powerline_fonts = 1
let g:airline_theme = 'hybridline'
let g:airline#extensions#tabline#enabled = 1

"-- vim-gitgutter --------------------------------------------------------------

let g:gitgutter_avoid_cmd_prompt_on_windows = 0

"-- ctrlp.vim ------------------------------------------------------------------

let g:ctrlp_match_window = 'top,order:btt,min:10,max:10,results:10'
let g:ctrlp_show_hidden = 1

" search in MRU, files and buffers at the same time
let g:ctrlp_cmd = 'CtrlPMixed'

"-- NERDTree -------------------------------------------------------------------

let g:NERDTreeMinimalUI=1
let g:NERDTreeMouseMode=3
let g:NERDTreeShowHidden=1
let g:NERDTreeChDirMode=2

nnoremap <silent> <C-e> :NERDTreeToggle<CR>

" open nerdtree on startup if no files were specified
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 0 && !exists("s:std_in") | NERDTree | endif

" track the open file in nerdtree
function! IsNTOpen()
  return exists("t:NERDTreeBufName") && (bufwinnr(t:NERDTreeBufName) != -1)
endfunction

function! IsNTFocused()
  return -1 != match(expand('%'), 'NERD_Tree')
endfunction

function! SyncTree()
  " Skip in non-interactive mode or when no file buffer exists
  if expand('%') ==# '' || !buflisted(bufnr('%'))
    return
  endif
  if &modifiable && IsNTOpen() && !IsNTFocused() && strlen(expand('%')) > 0 && !&diff
    try
      NERDTreeFind
      silent execute 'normal R'
      wincmd p
    catch
      " Silently ignore errors
    endtry
  endif
endfunction

" Only run autocommands when there's a valid file buffer
autocmd BufEnter * if expand('<afile>') !=# '' | call SyncTree() | endif

" vim-nerdtree-tabs
let g:nerdtree_tabs_autofind=1

"-- Syntastic ------------------------------------------------------------------

set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

let g:syntastic_quiet_messages={'level':'warnings'}
let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 0
let g:syntastic_check_on_wq = 0

"-- tagbar ---------------------------------------------------------------------

nmap <silent> <C-t> :TagbarToggle<CR>

"-- indentLine -----------------------------------------------------------------

let g:indentLine_char_list = ['┆', '┊']
let g:indentLine_enabled = 1
let g:indentLine_setColors = 0
let g:indentLine_showFirstIndentLevel = 0

"-- vim-json -------------------------------------------------------------------

let g:vim_json_syntax_conceal = 0

"-- sh -------------------------------------------------------------------------

let g:is_posix = 1
