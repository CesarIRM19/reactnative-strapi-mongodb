

export default function Resena({ logout }) {
  const theme = useTheme();
  const [checked, setChecked] = useState('first');
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchField, setSearchField] = useState('titulo'); // Estado para alternar entre campos de búsqueda
  const usuario = useContext(AuthContext);
  
  // Configuración de Formik
  const formik = useFormik({
    initialValues: {
      titulo: '',
      calificacion: '',
    },
    validationSchema: Yup.object({
      titulo: Yup.string().required('El título es obligatorio'),
      calificacion: Yup.number()
        .typeError('Debe ser un número')
        .min(1, 'La calificación mínima es 1')
        .max(10, 'La calificación máxima es 10')
        .required('La calificación es obligatoria'),
    }),
    onSubmit: async (values) => {
      console.log('esto es lo que hay en values: ',values)
    },
  });

  return (
    
      <View style={styles.container}>
        <Text style={styles.title}>Buscar reseña</Text>

        {/* Segmented Buttons para alternar búsqueda */}
        <SegmentedButtons
          value={searchField}
          onValueChange={setSearchField}
          buttons={[
            { value: 'titulo', label: 'Título' },
            { value: 'calificacion', label: 'Calificación' },
          ]}
          style={styles.segmentedButtons}
        />

        {/* Campo de búsqueda dinámico */}
        <TextInput
          label={`Buscar por ${searchField}`}
          value={formik.values[searchField]}
          onChangeText={(value) => formik.setFieldValue(searchField, value)}
          onBlur={() => formik.setFieldTouched(searchField)}
          mode="outlined"
          style={styles.input}
          keyboardType={searchField === 'calificacion' ? 'numeric' : 'default'}
          error={formik.touched[searchField] && !!formik.errors[searchField]}
        />
        {formik.touched[searchField] && formik.errors[searchField] && (
          <Text style={styles.errorText}>{formik.errors[searchField]}</Text>
        )}

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
  segmentedButtons: {
    marginBottom: 20,
  },
});
