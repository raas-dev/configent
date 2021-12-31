"--- Vundle --------------------------------------------------------------------

" Required for Vundle
set nocompatible
filetype off

set rtp+=~/.vim/bundle/Vundle.vim

call vundle#begin()

" Plugin manager
Plugin 'VundleVim/Vundle.vim'

" Add-ons
Plugin 'airblade/vim-gitgutter'
Plugin 'ap/vim-css-color'
Plugin 'bronson/vim-trailing-whitespace'
Plugin 'christoomey/vim-tmux-navigator'
Plugin 'ctrlpvim/ctrlp.vim'
Plugin 'easymotion/vim-easymotion'
Plugin 'editorconfig/editorconfig-vim'
Plugin 'godlygeek/tabular'
Plugin 'jistr/vim-nerdtree-tabs'
Plugin 'majutsushi/tagbar'
Plugin 'mattn/emmet-vim'
Plugin 'nathanaelkane/vim-indent-guides'
Plugin 'scrooloose/nerdtree'
Plugin 'scrooloose/nerdcommenter'
Plugin 'scrooloose/syntastic'
Plugin 'tpope/vim-fugitive'
Plugin 'tpope/vim-surround'
Plugin 'Xuyuanp/nerdtree-git-plugin'

" Language support
Plugin 'chrisbra/csv.vim'
Plugin 'ekalinin/Dockerfile.vim'
Plugin 'elixir-lang/vim-elixir'
Plugin 'elzr/vim-json'
Plugin 'hail2u/vim-css3-syntax'
Plugin 'moll/vim-node'
Plugin 'othree/html5.vim'
Plugin 'pangloss/vim-javascript'
Plugin 'tpope/vim-markdown'
Plugin 'tpope/vim-rails'
Plugin 'vim-ruby/vim-ruby'

" UI
Plugin 'bling/vim-airline'
Plugin 'vim-airline/vim-airline-themes'
Plugin 'noahfrederick/vim-hemisu'
Plugin 'ryanoasis/vim-devicons'

call vundle#end()

filetype plugin indent on


"--- Mouse ---------------------------------------------------------------------
set mouse=a                     " enable mouse in all modes

" terminal that supports mouse codes
if !has('nvim')
  set ttymouse=xterm2
endif


"-- Clipboard ------------------------------------------------------------------
set clipboard^=unnamed,unnamedplus
set pastetoggle=<F2>
set paste
set go+=a              " visual selection automatically copied to the clipboard


"--- General -------------------------------------------------------------------
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
set wildignore+=*.log,*.obj,*.o,*.jpg,*.png,*.gif,*.swp,vendor/rails/**

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

set backupdir=~/.vim/swap//
set directory=~/.vim/swap//

set tags=./tags

set undofile
set undodir=~/.vim-tmp/undo//


" --- Autoreload vim configs after changes -------------------------------------
augroup myvimrc
    au!
    au BufWritePost .vimrc,_vimrc,vimrc,.gvimrc,_gvimrc,gvimrc so $MYVIMRC | if has('gui_running') | so $MYGVIMRC | endif
augroup END

set autoread


"--- UI ------------------------------------------------------------------------
set guicursor=i:ver25-iCursor

" https://github.com/neovim/neovim/wiki/FAQ#cursor-style-isnt-restored-after-exiting-nvim
au VimLeave * set guicursor=a:ver25-iCursor

set background=dark
colorscheme hemisu

" make the statusbar more informative
if has("statusline")
  set laststatus=2
  set statusline=\ \ %F%m%r%h%w\ %=[%Y]\ (%{&ff},\ %{&enc})\ \{%v,\ %l/%L\}\ \ %p%%\
endif

highlight ColorColumn ctermbg=234


"--- Custom mappings -----------------------------------------------------------
" tab to indent and shift+tab to unindent also when in visual mode
vnoremap <silent> <Tab> >gv
vnoremap <silent> <S-Tab> <gv

" fast buffer switching
nnoremap <silent> <Tab> :bnext<CR>
nnoremap <silent> <S-Tab> :bprevious<CR>

" clear highlighting on escape in normal mode
nnoremap <silent> <esc> :noh<return><esc>
nnoremap <silent> <esc>^[ <esc>^[


" --- vim-airline --------------------------------------------------------------
let g:airline_powerline_fonts = 1
let g:airline_theme = 'hybridline'
let g:airline#extensions#tabline#enabled = 1


"--- vim-gitgutter -------------------------------------------------------------
let g:gitgutter_avoid_cmd_prompt_on_windows = 0


"--- ctrlp.vim -----------------------------------------------------------------
let g:ctrlp_match_window = 'top,order:btt,min:10,max:10,results:10'

let g:ctrlp_show_hidden = 1

" search in MRU, files and buffers at the same time
let g:ctrlp_cmd = 'CtrlPMixed'


"--- NERDTree ------------------------------------------------------------------
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
  if &modifiable && IsNTOpen() && !IsNTFocused() && strlen(expand('%')) > 0 && !&diff
    NERDTreeFind
    silent execute 'normal R'
    wincmd p
  endif
endfunction

autocmd BufEnter * call SyncTree()

" vim-nerdtree-tabs
let g:nerdtree_tabs_autofind=1

"--- Syntastic -----------------------------------------------------------------
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

let g:syntastic_quiet_messages={'level':'warnings'}
let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 0
let g:syntastic_check_on_wq = 0


"--- vim-node ------------------------------------------------------------------
" open new file in a vertical split instead of horizontal
autocmd User Node
  \ if &filetype == "javascript" |
  \   nmap <buffer> <C-w>f <Plug>NodeVSplitGotoFile |
  \   nmap <buffer> <C-w><C-f> <Plug>NodeVSplitGotoFile |
  \ endif


"--- tagbar --------------------------------------------------------------------
nmap <silent> <C-t> :TagbarToggle<CR>


"--- vim-indent-guides ---------------------------------------------------------
let g:indent_guides_auto_colors = 0
let g:indent_guides_enable_on_vim_startup = 1
let g:indent_guides_start_level = 2
let g:indent_guides_guide_size = 1
autocmd VimEnter,Colorscheme * :hi IndentGuidesOdd  guibg=black   ctermbg=232
autocmd VimEnter,Colorscheme * :hi IndentGuidesEven guibg=darkgrey  ctermbg=232


"--- vim-json ------------------------------------------------------------------
let g:vim_json_syntax_conceal = 0


"--- sh ------------------------------------------------------------------------
let g:is_posix = 1
