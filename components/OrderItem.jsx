import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";

import ModalOrder from './ModalOrder'

const OrderItem = ({ order }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const openModal = (order) => {
        setSelectedOrder(order);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedOrder(null);
    };

    return (
        <View style={styles.card} onPress={() => { }}>

            <View style={styles.textContainer}>

                <Text style={styles.text}>
                    Fecha de compra: {order.date}
                </Text>

                <Text style={styles.text2}>
                    Costo total: ${order.total}
                </Text>

            </View>

            <Feather name="search" size={30} color="black" onPress={() => openModal(order)} />

            {selectedOrder && (
                <ModalOrder
                    modalVisible={modalVisible}
                    selectedOrder={selectedOrder}
                    closeModal={closeModal}
                />
            )}
        </View>
    );
};

export default OrderItem;

const styles = StyleSheet.create({
    card: {
        minHeight: 150,
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        width: "70%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    text: {
        fontSize: 17,
        color: "black",
    },
    text2: {
        fontSize: 19,
        color: "gray",
    },
});
