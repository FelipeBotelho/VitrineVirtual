import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Stack,
  Heading,
  IconButton,
  position,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react"
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons'
import { useProducts } from "../../contexts/products";
import { useHistory } from "react-router-dom";
import AdminProductModal from "../../components/modal-admin-product";
import { ProductModel } from "../../types/products";
import Banner from "../../components/banner";

function Admin(props: any) {
  const { products, deleteProduct } = useProducts();
  const PropsModal = useDisclosure();
  const history = useHistory();
  const { onOpen } = PropsModal;
  const [product, setProduct] = useState<ProductModel>({ preco: 0 } as ProductModel);
  const [showDeleteMsg, setShowDeleteMsg] = useState(false);

  const [isOpen, setIsOpen] = React.useState(false)
  const [isAdding, setIsAdding] = useState(false);
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef<HTMLButtonElement>(null)


  const handleEdit: any = (item: any) => {
    setProduct(item);
    setIsAdding(false);
    onOpen();
  }

  const handleDelete: any = (item: any) => {
    setIsOpen(true);
    setProduct(item);
  }

  const confirmDelete: any = async () => {
    var result = await deleteProduct(product);
    if (result) {
      setShowDeleteMsg(true);
      onClose();
    }
  }

  const handleAddProduct: any = () => {
    const lastId = products.sort(function (a, b) {
      return a.id > b.id ? -1 : a.id < b.id ? 1 : 0;
    })[0].id;
    const productObject: ProductModel = {
      id: lastId + 1,
      descricao: "",
      foto: "",
      nome: "",
      preco: 0,
      quantidade: 0
    };
    setProduct(productObject);
    setIsAdding(true);
    onOpen();
  }


  return (
    <>
      <AdminProductModal isAdding={isAdding} product={product} modalProps={PropsModal} />
      <Banner />
      {showDeleteMsg ?
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Remoção de Produto!</AlertTitle>
          <AlertDescription>O Produto foi removido.</AlertDescription>
          <CloseButton onClick={() => setShowDeleteMsg(false)} position="absolute" right="8px" top="8px" />
        </Alert> : null}
      <Box as="main">

        <Stack spacing="md">
          <Heading
            as="h3"
            textTransform="uppercase"
            borderBottom="5px solid"
            borderColor="blue.600"
            p="0 10px"
            w="fit-content"
          >
            Manutenção de Produtos
          </Heading>
          <br />
          <Stack direction="row" spacing={4} style={{ display: "block" }}>
            <Button onClick={handleAddProduct} style={{ float: "right" }} leftIcon={<AddIcon />} colorScheme="blue" variant="solid">
              Adicionar Novo Produto
            </Button>

          </Stack>
          <Table variant="simple" style={{ background: "#fff" }}>
            <Thead>
              <Tr>
                <Th>Produto</Th>
                <Th>Descrição</Th>
                <Th>Quantidade</Th>
                <Th >Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.sort(function (a, b) {
                return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
              }).map((item) => (
                <Tr key={item.id}>
                  <Td>{item.nome}</Td>
                  <Td>{item.descricao}</Td>
                  <Td isNumeric>{item.quantidade}</Td>
                  <Td style={{ paddingRight: 0, paddingLeft: "10px" }}>
                    <IconButton
                      style={{ marginRight: "5px" }}
                      colorScheme="green"
                      size="sm"
                      aria-label="Editar Produto"
                      icon={<EditIcon />}
                      onClick={() => handleEdit(item)}
                    />
                    <IconButton
                      colorScheme="red"
                      size="sm"
                      aria-label="deletar produto"
                      icon={<DeleteIcon />}
                      onClick={() => handleDelete(item)}
                    />
                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Deletar Produto
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Deseja realmente remover este produto?
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancelar
                            </Button>
                            <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                              Deletar
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>
      </Box>
    </>
  );
}

export default Admin;