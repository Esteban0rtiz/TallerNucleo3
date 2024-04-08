import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F0E68C", // Fondo de color amarillo claro
  },
  inputs: {
    width: "90%",
    backgroundColor: "#FFF8DC", // Color de fondo para los inputs
    marginBottom: 10, // Espacio inferior entre los inputs
    borderRadius: 5, // Bordes redondeados
    paddingHorizontal: 15, // Espacio horizontal dentro de los inputs
    paddingVertical: 10, // Espacio vertical dentro de los inputs
  },
  buttons: {
    width: "90%",
    backgroundColor: "#32CD32", // Color de fondo verde para los botones
    padding: 15, // Espacio alrededor de los botones
    borderRadius: 5, // Bordes redondeados
  },
  textNavigation: {
    marginTop: 20,
    fontSize: 15,
    color: "#FF4500", // Color naranja oscuro para el texto de navegación
    fontWeight: "bold",
  },
  contentHome: {
    flex: 1,
    marginVertical: 50,
    marginHorizontal: 20,
    backgroundColor: "#FFA07A", // Fondo de color salmón claro
    padding: 20, // Espacio interior
    borderRadius: 10, // Bordes redondeados
  },
  headerHome: {
    flexDirection: "row",
    justifyContent: "space-between", // Espacio entre los elementos
    alignItems: "center",
    marginBottom: 20, // Espacio inferior
  },
  icon: {
    marginRight: 10, // Espacio a la derecha del icono
  },
  modal: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#F5F5F5", // Color de fondo gris claro para el modal
    marginHorizontal: 20,
    borderRadius: 10,
  },
  headerModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10, // Espacio inferior
  },
  contentLetter: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20, // Reducción del espacio vertical
    alignItems: "center",
    backgroundColor: "#98FB98", // Fondo de color verde claro para cada carta
    marginBottom: 10, // Espacio inferior entre cartas
    borderRadius: 5, // Bordes redondeados
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 10,
    bottom: 10,
    backgroundColor: "#32CD32", // Color de fondo verde para el FAB
  },
  contentDetailLetter: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#FFF", // Fondo de color blanco para el detalle de carta
    paddingVertical: 20,
    marginBottom: 20, // Espacio inferior
    borderRadius: 10, // Bordes redondeados
  },
  subjectLetter: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10, // Espacio inferior
  },
  textMessage: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10, // Espacio inferior
  },
});
