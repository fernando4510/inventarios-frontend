import {
  Box,
  Button,
  Card,
  Container,
  DialogActions,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Form, Formik } from "formik";
import { Layout } from "../../components";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RootState } from "../../state";
import { getAllProducts } from "../../state/action-creators/products";
import { newTransaction } from "../../state/action-creators/transactions";

interface values {
  id_producto: string;
  movimiento: string;
  fecha: string;
  cantidad: string;
  costo_unitario: string;
}

export const TransactionCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const { products } = useSelector((state: RootState) => state.products);

  const onSubmit = (values: values) => {
    dispatch(
      newTransaction(
        values.id_producto,
        values.movimiento,
        values.fecha,
        values.cantidad,
        values.costo_unitario
      )
    );
    navigate("/transacciones");
  };

  return (
    <Layout title="Transacciones">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Card style={{ padding: "35px" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              Nueva transaccion
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/transacciones"
              startIcon={<ArrowBackOutlinedIcon />}
            >
              Regresar
            </Button>
          </Stack>

          <Formik
            initialValues={
              {
                id_producto: "",
                movimiento: "",
                fecha: "",
                cantidad: "",
                costo_unitario: "",
              } as values
            }
            onSubmit={onSubmit}
            validationSchema={Yup.object({
              id_producto: Yup.string().required("Requerido"),
              movimiento: Yup.string().required("Requerido"),
              fecha: Yup.string().required("Requerido"),
              cantidad: Yup.string().required("Requerido"),
              costo_unitario: Yup.string().required("Requerido"),
            })}
          >
            {(props) => {
              const { values, touched, errors, handleChange, handleBlur } =
                props;

              return (
                <Container component="main" maxWidth="xs">
                  <Box
                    sx={{
                      marginTop: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Form noValidate>
                      <TextField
                        margin="normal"
                        select
                        fullWidth
                        label="Producto"
                        name="id_producto"
                        value={values.id_producto}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.id_producto &&
                          touched.id_producto &&
                          errors.id_producto
                        }
                      >
                        {products.map((product) => (
                          <MenuItem key={product.id} value={product.id}>
                            {product.nombre}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        margin="normal"
                        select
                        fullWidth
                        label="Movimiento"
                        name="movimiento"
                        value={values.movimiento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.movimiento &&
                          touched.movimiento &&
                          errors.movimiento
                        }
                      >
                        <MenuItem value="entrada">Entrada</MenuItem>
                        <MenuItem value="salida">Salida</MenuItem>
                      </TextField>

                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="fecha"
                        type="date"
                        value={values.fecha}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.fecha && touched.fecha && errors.fecha
                        }
                      />

                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Cantidad"
                        name="cantidad"
                        type="number"
                        value={values.cantidad}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.cantidad && touched.cantidad && errors.cantidad
                        }
                      />

                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Costo Unitario"
                        name="costo_unitario"
                        type="number"
                        value={values.costo_unitario}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.costo_unitario &&
                          touched.costo_unitario &&
                          errors.costo_unitario
                        }
                      />

                      <DialogActions>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Agregar Transaccion
                        </Button>
                      </DialogActions>
                    </Form>
                  </Box>
                </Container>
              );
            }}
          </Formik>
        </Card>
      </Container>
    </Layout>
  );
};
