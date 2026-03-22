import { Pressable, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Feather } from "@expo/vector-icons";
import * as React from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import SharedTodoModalContent from './SharedTodoModalContent';
 
function CheckMark({  id, completed, toggleTodo }) {
    async function toggle() {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
        headers: {
            "x-api-key": "abcdef123456",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
            value: completed ? false : true,
        }),
    });
    const data = await response.json();
    toggleTodo(id);
    console.log(data);
}
    return (
        <Pressable 
        onPress={toggle}
        style={[styles.checkMark, {backgroundColor: completed === 0 ? "#E9E9E8" : "#1daa4c"}]} />
    );
}


export default function Task({ 
    id,
    title,
    shared_with_user_id,
    completed,
    toggleTodo,
    clearTodo,
}) {
    const [isDeleteActive, setIsDeleteActive] = React.useState(false);
    const bottomSheetModalRef = React.useRef(null);
    const sharedBottomSheetRef = React.useRef(null);
    const snapPoints = ["25%", "48%", "75%"];
    const snapPointsShared = ["40%"];


    function handlePresentModal() {
        bottomSheetModalRef.current?.present();
    }

    function handlePresentShared() {
        sharedBottomSheetRef.current?.present();
    }

    async function deleteTodo() {
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: "DELETE",
        });
        console.log(response.status);
    }

    return (
        <TouchableOpacity
            onLongPress={()=> setIsDeleteActive(true)}
            onPress={()=> setIsDeleteActive(false)}
            activeOpacity={0.8}
            style={styles.container}
        >
            <View style={styles.containerTextCheckBox}>
                <CheckMark id={id} completed={completed} toggleTodo={toggleTodo} />
                <Text style={styles.text}>{title}</Text>
            </View>
            { shared_with_user_id != null ? (
                <Feather 
                    onPress={handlePresentShared}
                    name="users"
                    size={20}
                    color="#383839"
                />
            ) : (
                <Feather 
                    onPress={handlePresentModal}
                    name="share"
                    size={20}
                    color="#383839"
                />
            )}
            {isDeleteActive && (
                <Pressable onPress={deleteTodo} style={styles.deleteButton}>
                    <Text style={{color: "white", fontWeight: "bold"}}>x</Text>
                </Pressable>
            )}

            <BottomSheetModal
             ref={sharedBottomSheetRef}
             snapPoints={snapPointsShared}
             backgroundStyle={{borderRadius: 50, borderWidht: 4}}>

              <SharedTodoModalContent id={id} title={title} shared_with_id={shared_with_user_id} completed={completed} />   
            
            </BottomSheetModal>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerTextCheckBox: {
        flexDirection: "row",
        alignItems: "center",
    },
    
    deleteButton: {
        backgroundColor: "red",
        borderRadius: 50,
        width: 25,
        height: 25,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: -5,
        right: -5,
    },

    checkMark: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
    },
    container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",  
    padding: 14,
    borderRadius: 21,
    marginBottom: 10,
    backgroundColor: "#fff",
},
    contentContainer: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 15,
    },
    row: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    title: {
        letterSpacing: 0.5,
        fontSize: 16,
        fontWeight: "900",
    },
    subtitle: {
        color: "#101318",
        fontSize: 14,
        fontWeight: "bold",
    },
    description: {
        color: "#101318",
        fontSize: 14,
        fontWeight: "bold", 
    },
});