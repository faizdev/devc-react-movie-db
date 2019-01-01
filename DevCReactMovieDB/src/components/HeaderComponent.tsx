import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

interface HeaderInterface {
    title: String
}

export default class HeaderComponent extends React.Component<HeaderInterface> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title != "" ? this.props.title : "Your brain needs Energy :)"}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
        paddingLeft: 0,
        paddingTop: 60,
        marginTop: StatusBar.currentHeight,
        maxHeight: 200,
        backgroundColor: '#ffdb00'
    },

    title: {
        color: 'black',
        fontSize: 40,
        fontWeight: "bold",
        width: 300
    }
})