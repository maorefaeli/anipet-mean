# Install mongo om MacOS:

## Install Homebrew (if you don't have)
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
Run `./anipet start` to get mongo up and running on `localhost:27017`.

## Stop
Run `./anipet stop` to stop Anipet db