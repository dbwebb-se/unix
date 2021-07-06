#!/usr/bin/env bash

red=$(tput setaf 1)
green=$(tput setaf 2)
cyan=$(tput setaf 6)
normal=$(tput sgr 0)

cd me/kmom06/awk || exit 1

function printInfo
{
    local curr_script="$1"
    local format="$2"
    local rows="$3"
    local extra="$4"
    local lastfive="$5"

    printf "%s" "[$ACRONYM] Check awk exercise $curr_script "

    read -p ""

    awk -f "$curr_script" "awk_names.csv"

    printf "${cyan}===============\n"
    printf "%s\n" "Format: $format"
    printf "%s\n" "Rows: $(awk -f $curr_script 'awk_names.csv' | wc -l) ($rows)"
    printf "%s\n" "Extra: $extra"
    printf "%s\n${normal}" "$lastfive"

    read -p "View script? [y/N] " answer

    if [[ "$answer" = "y" ]]; then
        printf "${cyan}"
        more "$curr_script"
        printf "${normal}"
    fi
}

printInfo "1.awk" "<firstname> <lastname>" "1000" "No extra." "The last 5 should be: Dania Johansson, Petter Bruhn, Alvar Kristensson, Filippa Gidlund, Jens Åkerström"
printInfo "2.awk" "<firstname> <lastname>, <city>" "100" "No extra." "The last 5 should be: Ingemund, Jill, Iris, Jonna, Amos"
printInfo "3.awk" "<firstname> <lastname>, <city>" "9" "No extra." "The last 5 should be: Mirella, Nour, Agaton, Dania, Madelen"
printInfo "4.awk" "<firstname>    <lastname>    <phone>" "1003" "header, footer, TAB delimiter" "The last 5 should be: Dania, Petter, Alvar, Filippa, Jens"
printInfo "5.awk" "<firstname>    <lastname>    <city>" "22" "No extra." "The last 5 should be: Ove, Hillevi, Marika, Fanny, Gösta"
printInfo "6.awk" "<firstname>    <lastname>    <city>" "7" "Header, footer, aligned right." "All should be: Savannah, Betty, Kian, Valencia"
printInfo "7.awk" "<year>    <amount>" "24" "Look at the script..." "The last 5 should be: 48, 46, 45, 62, 46"
printInfo "8.awk" "<firstname> <lastname>, <born>, <phone>" "53" "No extra." "The last 5 should be: Angelina, Norah, Ragnar, Kalle, Vilja"
printInfo "9.awk" "<firstname> <lastname>, <born>, <phone>" "55" "No extra." "Answer should be 26."
if [[ -f "10.awk" ]]; then
    printInfo "10.awk" "<firstname> d/mmm-yyyy" "11" "No extra." "No leading zero, example: 'Joseph 2/nov-1997'"
fi

    # printf "%s" "[$ACRONYM] Check awk exercise $curr_script "
    #
    # read -p ""
    #
    # awk -f "$curr_script" "awk_names.csv"

    # printf "${cyan}===============\n"
    # printf "%s\n" "Format: <firstname> <lastname>"
    # printf "%s\n\n" "Rows: $(awk -f $curr_script 'awk_names.csv' | wc -l) (1000)"
    # printf "%s\n%s\n%s\n%s\n%s\n%s\n${normal}" "The last 5 should be:" "Dania Johansson" "Petter Bruhn" "Alvar Kristensson" "Filippa Gidlund" "Jens Åkerström"

    # read -p "View script? [y/N] " answer
    #
    # if [[ "$answer" = "y" ]]; then
    #     printf "${cyan}"
    #     more "$curr_script"
    #     printf "${normal}"
    # fi
