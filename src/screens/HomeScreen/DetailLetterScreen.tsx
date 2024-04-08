import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Divider, Text, TextInput } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Partido } from './HomeScreen';
import { ref, remove, update } from 'firebase/database';
import { dbRealTime } from '../../configs/firebaseConfig';

export const DetailLetterScreen = () => {
  const navigation = useNavigation();
  // Acceder a los parametros de navegacion
  const route = useRoute();
  const { partido } = route.params as { partido: Partido }; // Verificación de tipo

  const [detailForm, setDetailForm] = useState<Partido>({
    id: '',
    to: '',
    subject: '',
    message: ''
  });

  // Hook que carga los datos recibidos en el detailForm
  useEffect(() => {
    if (partido) {
      setDetailForm(partido);
    }
  }, [partido]); // Añadir partido como dependencia

  // Funcion que permite actualizar la data del formulario
  const handlerSetDetailForm = (key: string, value: string) => {
    setDetailForm({ ...detailForm, [key]: value });
  };

  // Funcion para actualizar el partido
  const handlerUpdatePartido = async () => {
    // Referencia a la base de datos
    const dbRef = ref(dbRealTime, 'partidos/' + detailForm.id);
    await update(dbRef, { subject: detailForm.subject, message: detailForm.message });
    navigation.goBack();
  };

  // Funcion para eliminar el partido
  const handlerDeletePartido = async () => {
    const dbRef = ref(dbRealTime, 'partidos/' + detailForm.id);
    await remove(dbRef);
    navigation.goBack();
  };

  return (
    <View style={styles.contentDetailLetter}>
      <View style={styles.subjectLetter}>
        <Text variant='headlineSmall'>Torneo:</Text>
        <TextInput
          value={detailForm.subject}
          onChangeText={(value) => handlerSetDetailForm('subject', value)}
          style={styles.inputs}
        />
      </View>
      <Divider bold />
      <View>
        <Text variant='bodyLarge'>Partido: {detailForm.to}</Text>
      </View>
      <Divider />
      <View>
        <Text style={styles.textMessage}>Mensaje</Text>
        <TextInput
          value={detailForm.message}
          multiline={true}
          numberOfLines={7}
          onChangeText={(value) => handlerSetDetailForm('message', value)}
          style={styles.inputs}
        />
      </View>
      <Button mode='contained' icon='email-sync' onPress={handlerUpdatePartido}>Actualizar</Button>
      <Button mode='contained' icon='email-remove' onPress={handlerDeletePartido}>Eliminar</Button>
    </View>
  );
};
