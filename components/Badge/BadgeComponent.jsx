import React from 'react'
import {Ionicons} from "@expo/vector-icons";
import {StyleSheet, View, Text} from 'react-native'
import {connect} from 'react-redux';

IconWithBadge  = ({ iconName, notificationCount, color, size })=> {
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={iconName} size={size} color={color} />
        {notificationCount > 0 && (
          <View
            style={{
              // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -10,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 25,
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
              
            }}
          >
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {notificationCount}
            </Text>
          </View>
        )}
      </View>
    );
  }

  const mapStateToProps = ({auth: {notificationCount}}) => ({
    notificationCount


})
export default connect(mapStateToProps) (IconWithBadge)  