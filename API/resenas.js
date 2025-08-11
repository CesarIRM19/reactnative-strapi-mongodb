import { API_URL } from '../util/constants'
import axios from 'axios';


export async function resenaObtener(values) {
  //console.log('Estos son los valores'+values.email)
  const url = `${API_URL}/resenas?users_permissions_user.id=${values.Auth.idUser}`
  console.log('esto es lo que hay en values: ')
  console.log(values)
  const params = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${values.Auth.token}`,
      'Content-Type': 'application/json',
    },
  }
  //c@gmail.com
  //123456
  try {
    console.log(params)
    console.log(url)
    const response = await fetch(url, params)

    const result = await response.json()

    
    //console.log(response)
    const username = result[0].users_permissions_user.username
    console.log(username)
    return [result,username]
  } catch (error) {
    console.log('Error desde aca')
    return null
  }
}

export async function resenaTitulo(values,usuario) {
  //console.log('Estos son los valores'+values.email)

  const url = `${API_URL}/resenas?titulo=${encodeURIComponent(values.titulo)}`
  console.log('esto es lo que hay en values: ')
  console.log(values)
  const params = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${usuario.Auth.token}`,
      'Content-Type': 'application/json',
    },
  }
  //c@gmail.com
  //123456
  try {
    console.log(params)
    console.log(url)
    const response = await fetch(url, params)

    const result = await response.json()

    console.log('Este es el resultado:', result)
    //console.log(response)
    const username = result[0].users_permissions_user.username
    console.log(username)
    return result
  } catch (error) {
    console.log('Error desde aca')
    return null
  }
}


export async function resenaCrear(values, selectedImage, isRecomendada, usuario) {
  if (!selectedImage) {
    throw new Error('No se seleccionó una imagen');
  }

  try {
    // Preparar datos para enviar a Strapi
    const formIMG = new FormData();

    // Agregar la imagen al FormData
    formIMG.append('files', {
      uri: selectedImage.assets[0].uri,
      name: selectedImage.assets[0].fileName || 'image.jpg',
      type: selectedImage.assets[0].mimeType || 'image/jpeg',
    });

    // Subir la imagen a Strapi
    const uploadResponse = await axios.post(`${API_URL}/upload`, formIMG, {
      headers: {
        Authorization: `Bearer ${usuario.Auth.token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Imagen subida:', uploadResponse.data[0]);


    // Obtener el ID de la imagen subida
    const imageId = uploadResponse.data[0].id;
    
    // Enviar datos e imagen a Strapi
    const formData = new FormData();
    formData.append('data', JSON.stringify({
      ...values,
      recomendada: isRecomendada,
      caratula: imageId,
      users_permissions_user: usuario.Auth.idUser,  // Asegúrate de que este es el ID
    }));

    console.log('values: ', formData);
    const response = await axios.post(`${API_URL}/resenas`, formData, {
      headers: {
        Authorization: `Bearer ${usuario.Auth.token}`,
        
      },
    });
    
    
    return response.data; // Retorna los datos de la respuesta
  } catch (error) {
    console.error('Error al enviar la reseña:', error);
    throw new Error('Error al enviar la reseña');
  }
}

export async function resenaActualizar(values, isRecomendada ,usuario) {
  try {
    // Enviar datos a Strapi
    const formData = new FormData();
    formData.append('data', JSON.stringify({
      ...values,
      recomendacion: isRecomendada,
      
    }));

    console.log('values: ', formData);
    const response = await axios.put(`${API_URL}/resenas/${values.id}`, formData, {
      headers: {
        Authorization: `Bearer ${usuario.Auth.token}`,
        
      },
    });
    return response.data; // Retorna los datos de la respuesta
  } catch (error) {
    console.error('Error al enviar la reseña:', error);
    throw new Error('Error al enviar la reseña');
  }
}

export const resenaEliminar = async (id, usuario) => {
  try {
    const response = await axios.delete(`${API_URL}/resenas/${id}`, {
      headers: {
        Authorization: `Bearer ${usuario.Auth.token}`,
      },
    });
    return response.data; // Retorna los datos de la respuesta
  } catch (error) {
    console.error('Error al eliminar la reseña:', error);
    throw new Error('Error al eliminar la reseña');
  }
}