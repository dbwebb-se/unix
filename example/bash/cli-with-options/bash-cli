#!/bin/bash
#
# A template for creating command line scripts taking options, commands
# and arguments.
#
# Exit values:
#  0 on success
#  1 on failure
#



# Name of the script
SCRIPT=$( basename "$0" )

# Current version
VERSION="1.0.0"



#
# Message to display for usage and help.
#
function usage
{
    local txt=(
"Utility $SCRIPT for doing stuff."
"Usage: $SCRIPT [options] <command> [arguments]"
""
"Command:"
"  command1             Demo of command."
"  command2 [anything]  Demo of command using arguments."
"  calendar [events]    Print out current calendar with(out) events."
""
"Options:"
"  --help, -h     Print help."
"  --version, -h  Print version."
    )
    
    printf "%s\n" "${txt[@]}"
}



#
# Message to display when bad usage.
#
function badUsage
{
    local message="$1"
    local txt=(
"For an overview of the command, execute:"
"$SCRIPT --help"
    )
    
    [[ $message ]] && printf "$message\n"

    printf "%s\n" "${txt[@]}"
}



#
# Message to display for version.
#
function version
{
    local txt=(
"$SCRIPT version $VERSION"
    )

    printf "%s\n" "${txt[@]}"
}



#
# Function for taking care of specific command. Name the function as the
# command is named.
#
function app-command1
{
    echo "This is output from command1."
}



#
# Function for taking care of specific command. Name the function as the
# command is named.
#
function app-command2
{
    echo "This is output from command2."
    echo "Command 2 takes additional arguments which currently are:"
    echo " Number of arguments = '$#'"
    echo " List of arguments = '$*'"
}



#
# Function for taking care of specific command. Name the function as the
# command is named.
#
function app-calendar
{
    local events="$1"
    
    echo "This is output from command3, showing the current calender."
    cal -3
    
    if [ "$events" = "events" ]; then
        echo
        calendar
    fi
}



#
# Process options
#
while (( $# ))
do
    case "$1" in

        --help | -h)
            usage
            exit 0
        ;;

        --version | -v)
            version
            exit 0
        ;;

        command1         \
        | command2       \
        | calendar)
            command=$1
            shift
            app-$command $*
            exit 0
        ;;
        
        *)
            badUsage "Option/command not recognized."
            exit 1
        ;;
        
    esac
done

badUsage
exit 1
