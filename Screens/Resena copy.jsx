import { View, StyleSheet, ScrollView } from 'react-native'
import { TextInput, Button, Text, useTheme,Image, RadioButton } from 'react-native-paper';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Header from '../compoents/Peliculas/Heder';
import { useFormik } from 'formik';
import * as Yup from 'yup';


export default function Resena({ logout }) {
  const theme = useTheme(); // Obtener el tema para el color de los botones
  const [checked, setChecked] = React.useState('first');
  const [selectedImage, setSelectedImage] = useState(null);

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
    onSubmit:async (values) => {
      if (!selectedImage) {
        Alert.alert('Error', 'Por favor selecciona una imagen');
        return;
      }
    },
  });

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
        <Text style={styles.title}>Formulario de Registro</Text>

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
          <Image source={{ uri: selectedImage.uri }} style={styles.imagePreview} />
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
    backgroundColor: '#4B0082', // Fondo morado oscuro
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700', // Texto amarillo
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF', // Fondo blanco
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
  button: {
    marginTop: 20,
    padding: 5,
  },
  radioLabel: {
    marginTop: 20,
    color: '#FFD700', // Texto amarillo
    fontSize: 16,
  },
  radioText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 5,
  },
});



/*
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';

export default function Formulario() {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    estreno: '',
    director: '',
    productor: '',
    guion: '',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log('Datos del formulario:', formData);
    alert('Formulario enviado');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Añadir Película</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el nombre de la película"
        placeholderTextColor="#B0B0B0"
        value={formData.nombre}
        onChangeText={(value) => handleChange('nombre', value)}
      />

      <Text style={styles.label}>Precio</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el precio"
        placeholderTextColor="#B0B0B0"
        keyboardType="numeric"
        value={formData.precio}
        onChangeText={(value) => handleChange('precio', value)}
      />

      <Text style={styles.label}>Estreno</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el año de estreno"
        placeholderTextColor="#B0B0B0"
        keyboardType="numeric"
        value={formData.estreno}
        onChangeText={(value) => handleChange('estreno', value)}
      />

      <Text style={styles.label}>Director</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el nombre del director"
        placeholderTextColor="#B0B0B0"
        value={formData.director}
        onChangeText={(value) => handleChange('director', value)}
      />

      <Text style={styles.label}>Productor</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el nombre del productor"
        placeholderTextColor="#B0B0B0"
        value={formData.productor}
        onChangeText={(value) => handleChange('productor', value)}
      />

      <Text style={styles.label}>Guión</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el guionista"
        placeholderTextColor="#B0B0B0"
        value={formData.guion}
        onChangeText={(value) => handleChange('guion', value)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#4B0082', // Morado oscuro
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: '#FFD700', // Amarillo
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#FFD700', // Amarillo
    fontSize: 16,
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#6A0DAD', // Tonos de morado
    color: '#FFFFFF', // Blanco
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFD700', // Amarillo
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttonText: {
    color: '#4B0082', // Morado oscuro
    fontSize: 18,
    fontWeight: 'bold',
  },
});
*/