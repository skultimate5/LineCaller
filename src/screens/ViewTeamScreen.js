import React from 'react';
import { View, Text } from 'react-native';
import { Header, List, ListItem } from 'react-native-elements';

import LocalStorage from '../storage/LocalStorage.js';

export class ViewTeamScreen extends React.Component {

	// allows for custom navigation?
	static navigationOptions = {
		title: "This doesn't seem to matter",
		headerLeft: null,
		header: null
	};

	constructor(props) {
		super(props)

		// initialize all the teams on the device
		this.state = { 
			LocalStorage: new LocalStorage(),
			teams: [],
			currentTeamName: props.navigation.state.params.currentTeamName
		 };
	}

	componentDidMount() {
		// get the teams 
		this.setState({ isLoading: true });
		this.getTeams();
	}

	// get the teams and tell the component it is not loading
	async getTeams() {
		this.state.teams = await this.state.LocalStorage.getAllTeams();
		this.setState( {isLoading: false });
	}

	// changes the team and returns to the home screen
	changeTeam(team) {
		this.state.LocalStorage.setCurrentTeamName(team.name);
		this.props.navigation.navigate('Home');
	}

	render() {
		return (
			<View>
				<Header
					outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
					leftComponent={{
						icon: 'arrow-back',
						color: '#fff',
						onPress: () => this.props.navigation.goBack()
					}}
					centerComponent={{ text: 'View Teams', style: { color: '#fff', fontSize:20 } }} 
				/>
				<View>
                    {this.state.isLoading && <Text style={{ color: 'red', textAlign: 'center' }}>Loading</Text>}
					{!this.state.isLoading &&
					<List>
						{
							this.state.teams.map((team, i) => (
								<ListItem
									key={i}
									title={team.name}
									hideChevron={true}
									//onPress={() => {this.changeTeam(team)}}
									onPress={() => this.props.navigation.navigate('TeamDetail', {team, currentTeamName: this.state.currentTeamName})}
								/>
							))
						}
					</List>
					}
				</View>
			</View>
		)
	}
}