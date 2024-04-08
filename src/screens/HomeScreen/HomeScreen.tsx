import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { updateProfile } from 'firebase/auth';
import { auth, dbRealTime } from '../../configs/firebaseConfig';
import firebase from 'firebase/auth';
import { LetterCardComponent } from './components/LetterCardComponent';
import { NewLetterComponent } from './components/NewLetterComponent';
import { onValue, ref } from 'firebase/database';

interface UserForm {
  name: string;
}

export interface Partido {
  id: string;
  to: string;
  subject: string;
  message: string;
}

export const HomeScreen = () => {
  const [showModalProfile, setShowModalProfile] = useState(false);
  const [showModalLetter, setShowModalLetter] = useState(false);
  const [userForm, setUserForm] = useState<UserForm>({
    name: '',
  });
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null);
  const [partidos, setPartidos] = useState<Partido[]>([]);

  useEffect(() => {
    setUserAuth(auth.currentUser);
    setUserForm({ name: auth.currentUser?.displayName ?? '' });
    getAllPartidos();
  }, []);

  const handlerUpdateUserForm = (key: string, value: string) => {
    setUserForm({ ...userForm, [key]: value });
  };

  const handlerUpdateUser = async () => {
    try {
      await updateProfile(userAuth!, { displayName: userForm.name });
    } catch (e) {
      console.log(e);
    }
    setShowModalProfile(false);
  };

  const getAllPartidos = () => {
    const dbRef = ref(dbRealTime, 'partidos');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const getKeys = Object.keys(data);
      const listPartidos: Partido[] = [];
      getKeys.forEach((key) => {
        const value = { ...data[key], id: key };
        listPartidos.push(value);
      });
      setPartidos(listPartidos);
    });
  };

  return (
    <>
      <View style={[styles.contentHome, { backgroundColor: '#FFE4B5' }]}>
        <View style={styles.headerHome}>
          <Avatar.Text size={55} label="CF" />
          <View>
            <Text variant='bodySmall'>Bienvenido</Text>
            <Text variant='labelLarge'>{userForm.name}</Text>
          </View>
          <View style={styles.icon}>
            <IconButton
              icon="cog"
              size={30}
              onPress={() => setShowModalProfile(true)}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={partidos}
            renderItem={({ item }) => <LetterCardComponent partido={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
          <View style={styles.headerModal}>
            <Text variant='headlineLarge'>Mi Nombre</Text>
            <IconButton icon='close' onPress={() => setShowModalProfile(false)} />
          </View>
          <Divider bold />
          <View>
            <TextInput
              mode='outlined'
              label='Partido'
              value={userForm.name}
              onChangeText={(value) => handlerUpdateUserForm('name', value)}
            />
            <TextInput
              mode='outlined'
              label='Torneo'
              value={userAuth?.email!}
              disabled
            />
          </View>
          <Button mode='contained' onPress={() => handlerUpdateUser()} style={{ backgroundColor: '#228B22' }}>Actualizar</Button>
        </Modal>
      </Portal>
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: '#228B22' }]}
        onPress={() => setShowModalLetter(true)}
      />
      <NewLetterComponent visible={showModalLetter} setVisible={setShowModalLetter} />
    </>
  );
};
