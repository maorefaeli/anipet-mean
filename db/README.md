# Install mongo om MacOS:

## Install Homebrew
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## Install MongoDB
```
brew tap mongodb/brew
brew install mongodb-community@4.2
```

# Run Database

## Permissions
```
cd db
chmod +x anipet
```
## Start
```
./anipet start
```

## Stop
```
./anipet stop
```