import * as React from 'react';
import { View, Text } from 'react-native';

export default function IniciScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('Holita caracolita')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Pantalla d'inici</Text>
        </View>
    );
}