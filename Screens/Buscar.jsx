import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView ,Alert} from 'react-native';
import { TextInput, Button, Text, useTheme, RadioButton, SegmentedButtons, IconButton } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../compoents/Peliculas/Heder';
import { resenaActualizar, resenaEliminar, resenaTitulo } from "../API/resenas";
import AuthContext from '../context/AuthContext';


export default function Resena({ logout }) {
  const theme = useTheme();
  const usuario = useContext(AuthContext);
  const [showbuscar, setshowbuscar] = useState(false);
  const [searchField, setSearchField] = useState('titulo');
  const [checked, setChecked] = useState('first');
  const [idBorrar, setidBorrar] = useState(null)





  // Configuración de Formik
  const formik = useFormik({
    initialValues: {
      titulo: '',
    },
    validationSchema: Yup.object({
      titulo: Yup.string().required('El título es obligatorio'),
    }),
    onSubmit: async (values) => {
      
      try {
        console.log('esto es lo que hay en values: ',values)
        // Llamar a la función externa para enviar datos
        const response = await resenaTitulo(values, usuario);
        console.log(response[0].id)

        if (response[0].id) {
          // Inicializa los valores del formulario `actualizar` con los datos recibidos
          setidBorrar(response[0].id)

          actualizar.setValues({
            id: response[0].id,
            titulo: response[0].titulo || '',
            opinion: response[0].opinion || '',
            calificacion: response[0].calificacion ? Number(response[0].calificacion) : '',
            recomendacion: response[0].recomendacion,
          });
          setChecked(response[0].recomendacion ? 'first' : 'second');
        }

        Alert.alert('Éxito', 'Reseña enviada con éxito');
        console.log('Respuesta del servidor:', response);
        setshowbuscar(true)
      } catch (error) {
        Alert.alert('Error', error.message);
      }

      
    },
  });
  const actualizar = useFormik({
    initialValues: {
      id: '',
      titulo: '',
      opinion: '',
      calificacion: '',
      recomendacion: '',
    },
    validationSchema: Yup.object({
      titulo: Yup.string().required('El título es obligatorio'),
      opinion: Yup.string().required('La opinión es obligatoria'),
      
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
        console.log('esto es lo que hay en checked: ',checked)
        const response = await resenaActualizar(values, checked === 'first' ,usuario);
        console.log(response)

        Alert.alert('Éxito', 'Reseña enviada con éxito');
        console.log('Respuesta del servidor:', response);
        setshowbuscar(true)
      } catch (error) {
        Alert.alert('Error', error.message);
      }

    },
  });

  const Eliminar = async() => {
    try {
      console.log('esto es lo que hay en borrar: ',idBorrar)
      // Llamar a la función externa para enviar datos
      const response = await resenaEliminar(idBorrar, usuario);
      console.log(response)

      Alert.alert('Éxito', 'Reseña enviada con éxito');
      console.log('Respuesta del servidor:', response);
      setshowbuscar(true)
    } catch (error) {
      console.log('esto es el error: ',error)
    }
  }
  return (
    <ScrollView style={{ backgroundColor: '#4B0082' }}>
      <Header Texto="Hola" logout={logout} />
      <View style={styles.container}>
        <Text style={styles.title}>Buscar reseña</Text>
      </View>
      <View style={[styles.inputContainer, styles.row]}>
        <TextInput
          label="Título de la película"
          value={formik.values.titulo}
          onChangeText={(value) => formik.setFieldValue('titulo', value)}
          onBlur={() => formik.setFieldTouched('titulo')}
          mode="outlined"
          style={styles.textInput}
          error={formik.touched.titulo && !!formik.errors.titulo}
        />
        <IconButton
          icon="magnify"
          size={24}
          mode='outlined'
          iconColor={theme.colors.inverseOnSurface}
          onPress={formik.handleSubmit}
          style={styles.iconButton}
        />
      </View>
      <View style={styles.container}>
        {formik.touched.titulo && formik.errors.titulo && (
          <Text style={styles.errorText}>{formik.errors.titulo}</Text>
        )}



        {showbuscar ? (
          <>
            <SegmentedButtons
              value={searchField}
              onValueChange={setSearchField}
              buttons={[
                { value: 'titulo', label: 'Título' },
                { value: 'opinion', label: 'Opinion' },
                { value: 'calificacion', label: 'Calificación' },
              ]}
              style={styles.segmentedButtons}
            />

            {/* Campo de búsqueda dinámico */}
            <TextInput
              label={`Buscar por ${searchField}`}
              value={String(actualizar.values[searchField])}
              onChangeText={(value) => actualizar.setFieldValue(searchField, value)}
              onBlur={() => actualizar.setFieldTouched(searchField)}
              mode="outlined"
              style={styles.input}
              keyboardType={searchField === 'calificacion' ? 'numeric' : 'default'}
              error={actualizar.touched[searchField] && !!actualizar.errors[searchField]}
            />
            {actualizar.touched[searchField] && actualizar.errors[searchField] && (
              <Text style={styles.errorText}>{actualizar.errors[searchField]}</Text>
            )}
            <View style={[styles.inputContainer, styles.row]}>
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
            </View>
            <View style={[styles.inputContainer, styles.row]}>
              {/* Botón Enviar */}
              <Button
                mode="contained"
                onPress={actualizar.handleSubmit}
                style={styles.button}
                buttonColor={theme.colors.secondary}
              >
                Enviar
              </Button>
              <Button
                mode="contained"
                onPress={Eliminar}
                style={styles.button}
                buttonColor={theme.colors.primary}
              >
                Borrar
              </Button>
            </View>
          </>
        ) : false}


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
  inputContainer: {
    flexDirection: 'row', // Coloca los elementos en una fila
    alignItems: 'center', // Centra verticalmente los elementos


  },

  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },

  textInput: {
    flex: 1,
    marginLeft: '5%',
    backgroundColor: '#FFFFFF',
  },
  iconButton: {
    marginLeft: 5,
  },
  button: {
    marginTop: 20,
    marginHorizontal: 5,
    flex: 1,
    padding: 5,
    backgroundColor: '#29004D',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  segmentedButtons: {
    marginBottom: 20,
  },
  radioLabel: {
    marginTop: 20,
    color: '#FFD700',
    fontSize: 16,
  },
  radioText: {
    marginTop: 20,
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 5,
  },
});
