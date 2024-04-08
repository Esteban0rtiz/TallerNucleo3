import React from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import { Partido } from '../HomeScreen'
import { CommonActions, useNavigation } from '@react-navigation/native'

interface Props{
  partido: Partido,
}

export const LetterCardComponent = ({partido}:Props) => {

  const navigation=useNavigation()

  return (
    <View style={styles.contentLetter}>
        <View>
            <Text variant='labelLarge'>Torneo: {partido.to}</Text>
            <Text variant='bodyMedium'>Partido: {partido.subject}</Text>
        </View>
        <View style={styles.icon}>
        <IconButton
            icon="email-open"
            size={25}
            onPress={() => navigation.dispatch(CommonActions.navigate({name:'Detail', params:{partido}}))}
        />
        </View>
    </View>
  )
}

