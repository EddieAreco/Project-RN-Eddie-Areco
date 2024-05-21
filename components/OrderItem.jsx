import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import React from "react";

const OrderItem = ({ order }) => {

    return (
        <View style={styles.card} onPress={() => { }}>

            <View style={styles.textContainer}>

                <Text style={styles.text}>
                    Fecha de compra: {order.date}
                </Text>

                <Text style={styles.text2}>
                    Costo total: ${order.total}
                </Text>

                <Text style={styles.text2}>
                    Productos:
                </Text>
                {order.products.map((product, index) => (
                    <Text key={index} style={styles.productText}>
                        {product.brand} - ${product.price}
                    </Text>
                ))}

            </View>

            <Feather name="search" size={30} color="black" />
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