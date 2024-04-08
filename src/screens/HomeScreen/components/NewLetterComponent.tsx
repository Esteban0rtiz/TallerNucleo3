import React, { useState } from 'react';
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { push, ref, set } from 'firebase/database';
import { dbRealTime } from '../../../configs/firebaseConfig';
import { styles } from '../../../theme/styles';

// Interface que indica los props que este componente va a manejar
interface Props {
  visible: boolean;
  setVisible: Function;
}

interface PartidoForm {
  to: string;
  subject: string;
  message: string;
}

export const NewLetterComponent = ({ visible, setVisible }: Props) => {
  // Hook useState: Actualizar los datos de nuestro formulario
  const [partidoForm, setPartidoForm] = useState<PartidoForm>({
    to: '',
    subject: '',
    message: ''
  });

  // Funcion que captura y actualiza los valores del formulario
  const handlerSetPartidoForm = (key: string, value: string) => {
    setPartidoForm({ ...partidoForm, [key]: value });
  };

  // Funcion para guardar los partidos
  const handlerSavePartido = async () => {
    if (!partidoForm.to || !partidoForm.subject || !partidoForm.message) { 
      return;
    }

    const dbRef = ref(dbRealTime, 'partidos');
    const savePartido = push(dbRef);
    
    try {
      await set(savePartido, partidoForm);
      setPartidoForm({
        message:'',
        subject:'',
        to:''
      });
    } catch (error) {
      console.log(error);
    }
    
    setVisible(false);
  };

  return (
    <Portal>
      <Modal visible={visible} contentContainerStyle={styles.modal}>
        <View style={styles.headerModal}>
          <Text variant='headlineMedium'>Nuevo Partido</Text>
          <IconButton icon='close' onPress={() => setVisible(false)} />
        </View>
        <Divider bold />
        <TextInput
          label='Hora'
          mode='outlined'
          onChangeText={(value) => handlerSetPartidoForm('to', value)}
          style={styles.inputs}
        />
        <TextInput
          label='Torneo'
          mode='outlined'
          onChangeText={(value) => handlerSetPartidoForm('subject', value)}
          style={styles.inputs}
        />
        <TextInput
          label='Mensaje'
          mode='outlined'
          onChangeText={(value) => handlerSetPartidoForm('message', value)}
          multiline={true}
          numberOfLines={7}
          style={styles.inputs}
        />
        <Button style={styles.buttons} mode='contained' onPress={() => handlerSavePartido()}>Guardar Partido</Button>
      </Modal>
    </Portal>
  );
};
