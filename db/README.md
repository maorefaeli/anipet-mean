# Install Mongo om MacOS:

## Install Homebrew (if you don't have)
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## Install MongoDB
```
brew tap mongodb/brew
brew install mongodb-community@4.2
```

## Install Robo3t
Download from `https://robomongo.org/download`

# Run Database
All commands are from `db` folder
```
cd db
```

## Permissions
```
chmod +x anipet
mkdir -p data/mongodb
sudo chmod 777 data/mongodb
```

## Start
Run `./anipet start` to get mongo up and running on `localhost:27017`.

## Stop
Run `./anipet stop` to stop Anipet db

## Wipe
Run `./anipet wipe` to wipe out the db and start fresh

## Take db dump
Run `./anipet dump` to take a new db dump
