import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface State {
    keyword: string
    placeholder: string
}

interface Props {
    searchHandler: (event: string) => void
}

export default class SearchBox extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            keyword: "",
            placeholder: "Find your energy"
        }
    }

    searchHandler = (text: string) => {
        this.setState({ keyword: text })
        this.props.searchHandler(text)
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.keyword == "" && <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} transform="shrink-8" />}
                <TextInput
                    style={styles.textField}
                    placeholder={this.state.placeholder}
                    value={this.state.keyword}
                    onChangeText={(text) => { this.searchHandler(text) }} />
                <TouchableOpacity onPress={() => { this.searchHandler("") }}>
                    {this.state.keyword != "" && <FontAwesomeIcon icon={faTimesCircle} style={styles.searchIcon} transform="shrink-8" />}
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 7,
        backgroundColor: "#e9e9eb",
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        maxHeight: 40,
    },
    textField: {
        fontSize: 14,
        flexGrow: 1,
        paddingLeft: 6
    },
    searchIcon: {
        color: "#ccc",
    },
    buttonClear: {

    }
})