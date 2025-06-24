import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Animated,
  PanResponder,
  ScrollView
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";

const CustomBottomSheet = ({ visible, onDismiss, children }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  // Reset translateY when modal closes
  useEffect(() => {
    if (!visible) {
      translateY.setValue(0);
    }
  }, [visible]);

  //panResponder to down the sheet
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          onDismiss?.();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <Pressable style={styles.backdrop} onPress={onDismiss}>
          <View style={styles.flexBottom} />
        </Pressable>

        <View style={{ backgroundColor: "rgba(0,0,0,0.3)", maxHeight: '85%' }}>
          <Animated.View
            style={[styles.sheetContent, { transform: [{ translateY }] }]}
            {...panResponder.panHandlers}
          >
            <View style={styles.handle} />
            <ScrollView>
              {children}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    height: "100%",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  flexBottom: {
    flex: 1,
  },
  sheetContent: {
    backgroundColor: "white",
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    paddingTop: scale(14),
    // paddingBottom: verticalScale(14),
  },
  handle: {
    width: scale(40),
    height: verticalScale(4),
    borderRadius: scale(2),
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: verticalScale(10),
  },
});

export default CustomBottomSheet;