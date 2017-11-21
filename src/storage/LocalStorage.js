import { AsyncStorage } from 'react-native';

export default class LocalStorage {
    async getTeam(teamName) {
        return AsyncStorage.getItem(`@team:${teamName}`)
        .then((team) => {
            return JSON.parse(team)
        })
    }

    async setTeam(teamName, teamData) {
        return AsyncStorage.setItem(`@team:${teamName}`, JSON.stringify(teamData))
    }

    async removeTeam(teamName) {
        return AsyncStorage.removeItem(`@team:${teamName}`)
    }

    async getAllTeams() {
        return AsyncStorage.getAllKeys()
        .then((keys) => {
            const fetchKeys = keys.filter((k) => { return k.startsWith('@team:'); });
            return AsyncStorage.multiGet(fetchKeys);
        })
        .then((result) => {
            return result.map((r) => { return JSON.parse(r[1]); });
        });
    }

    async removeAllTeams() {
        this.getAllTeams().then((teams) => {
            teams.forEach((team) => {
                this.removeTeam(team.name)
            })
        })
    }

    async getCurrentTeamName() {
        return AsyncStorage.getItem(`currentTeamName`)
        .then((team) => {
            return team
        })
    }

    async setCurrentTeamName(currentTeamName) {
        return AsyncStorage.setItem(`currentTeamName`, currentTeamName)
    }

    async removeCurrentTeamName(teamName) {
        return AsyncStorage.removeItem(`currentTeamName`)
    }

    async getCurrentGame() {
        return AsyncStorage.getItem(`currentGame`)
        .then((game) => {
            return JSON.parse(game)
        })
    }

    async setCurrentGame(game) {
        return AsyncStorage.setItem(`currentGame`, JSON.stringify(game))
    }

    async removeCurrentGame() {
        return AsyncStorage.removeItem(`currentGame`)
    }
}
