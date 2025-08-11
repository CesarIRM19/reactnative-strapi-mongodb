import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme, RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../compoents/Peliculas/Heder';
import { resenaCrear } from "../API/resenas";
import AuthContext from '../context/AuthContext';

export default function Resena({ logout }) {
  const theme = useTheme();
  const [checked, setChecked] = useState('first');
  const [selectedImage, setSelectedImage] = useState(null);
  const usuario = useContext(AuthContext)
  
  // Configuración de Formik
  const formik = useFormik({
    initialValues: {
      titulo: '',
      opinion: '',
      calificacion: '',
    },
    validationSchema: Yup.object({
      titulo: Yup.string().required('El título es obligatorio'),
      opinion: Yup.string()
        .min(10, 'La opinión debe tener al menos 10 caracteres')
        .required('La opinión es obligatoria'),
      calificacion: Yup.number()
        .typeError('Debe ser un número')
        .min(1, 'La calificación mínima es 1')
        .max(10, 'La calificación máxima es 10')
        .required('La calificación es obligatoria'),
    }),
    onSubmit: async (values) => {
      try {
        console.log('esto es lo que hay en values: ',values)
        // Llamar a la función externa para enviar datos
        const response = await resenaCrear(values, selectedImage, checked === 'first', usuario);
        Alert.alert('Éxito', 'Reseña enviada con éxito');
        console.log('Respuesta del servidor:', response);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    },
  });

  // Función para seleccionar una imagen
  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permiso denegado', 'Se necesita acceso a tu galería para continuar.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result);
      console.log('Imagen seleccionada:', result);
      
    }
  };

  return (
    <ScrollView>
      <Header Texto="Hacer reseña" logout={logout} />

      <View style={styles.container}>
        <Text style={styles.title}>Nueva reseña</Text>

        {/* Campo: Título */}
        <TextInput
          label="Título de la película"
          value={formik.values.titulo}
          onChangeText={(value) => formik.setFieldValue('titulo', value)}
          onBlur={() => formik.setFieldTouched('titulo')}
          mode="outlined"
          style={styles.input}
          error={formik.touched.titulo && !!formik.errors.titulo}
        />
        {formik.touched.titulo && formik.errors.titulo && (
          <Text style={styles.errorText}>{formik.errors.titulo}</Text>
        )}

        {/* Campo: Opinión */}
        <TextInput
          label="Opinión de la película"
          value={formik.values.opinion}
          onChangeText={(value) => formik.setFieldValue('opinion', value)}
          onBlur={() => formik.setFieldTouched('opinion')}
          mode="outlined"
          style={styles.input}
          multiline
          error={formik.touched.opinion && !!formik.errors.opinion}
        />
        {formik.touched.opinion && formik.errors.opinion && (
          <Text style={styles.errorText}>{formik.errors.opinion}</Text>
        )}

        {/* Campo: Calificación */}
        <TextInput
          label="Calificación de la película"
          value={formik.values.calificacion}
          onChangeText={(value) => formik.setFieldValue('calificacion', value)}
          onBlur={() => formik.setFieldTouched('calificacion')}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          error={formik.touched.calificacion && !!formik.errors.calificacion}
        />
        {formik.touched.calificacion && formik.errors.calificacion && (
          <Text style={styles.errorText}>{formik.errors.calificacion}</Text>
        )}

        {/* Seleccionar imagen */}
        <Button mode="outlined" onPress={selectImage} style={styles.button}>
          Seleccionar Imagen
        </Button>
        {selectedImage && (
          <Image source={{ uri: selectedImage.assets[0].uri }} style={styles.imagePreview} />
        )}

        {/* Opciones: Recomendación */}
        <Text style={styles.radioLabel}>¿Recomiendas esta película?</Text>
        <RadioButton
          value="true"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('first')}
        />
        <Text style={styles.radioText}>Sí</Text>
        <RadioButton
          value="false"
          status={checked === 'second' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('second')}
        />
        <Text style={styles.radioText}>No</Text>

        {/* Botón Enviar */}
        <Button
          mode="contained"
          onPress={formik.handleSubmit}
          style={styles.button}
          buttonColor={theme.colors.primary}
        >
          Enviar
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#4B0082',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  imagePreview: {
    marginTop: 10,
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  radioLabel: {
    marginTop: 20,
    color: '#FFD700',
    fontSize: 16,
  },
  radioText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 5,
  },
});
