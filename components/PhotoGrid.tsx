import { useState } from "react";
import * as _ from "lodash";
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

type Photo = {
  url: string;
};
type Props = {
  PhotosList: Photo[];
  borderRadius: number;
  children?: any;
  imageProps?: any;
};

const PhotoGrid = ({
  PhotosList,
  borderRadius,
  children,
  imageProps,
}: Props) => {

  const renderChunk = () => {
    let chunk = _.chunk(PhotosList, PhotosList.length);
    return chunk.map((chunkItem, index) => {
      let row = _.chunk(chunkItem, 3);

      return row.map((rowItem, rowIndex) => {
        return renderPhotoRow(rowItem, rowIndex, index * PhotosList.length + rowIndex * 3);
      });
    });
  };

  const renderItem = (item: any, index: number, expanded: any) => {
    return (
      <View
        key={index}
        style={[
          expanded ? styles.expandedView : styles.photoView,
          { borderRadius: borderRadius },
        ]}
      >
        <TouchableOpacity>
          <Image
            source={{ uri: item.url }}
            {...imageProps}
            style={[
              imageProps && imageProps.style,
              styles.ImageStyle,
              ...(expanded ? [styles.expandedImage] : []),
              { borderRadius },
            ]}
          />
          {children && children(item)}
        </TouchableOpacity>
      </View>
    );
  };

  const renderPhotoRow = (rowItem: any, rowIndex: number, index: number) => {
    if (rowIndex == 0 || rowIndex> 2) {
      return renderPhotoRow1(rowItem, index);
    } else if (rowIndex == 1) {
      return renderPhotoRow2(rowItem, index);
    } else if (rowIndex == 2) {
      return renderPhotoRow3(rowItem, index);
    }
  };

  const renderPhotoRow1 = (row: any, index: number) => {
    return (
      <View key={index} style={styles.alignCenter}>
        {row.map((item: any, i: number) => {
          return renderItem(item, index + i, false);
        })}
      </View>
    );
  };

  const renderPhotoRow2 = (row: any, index: number) => {
    if (row.length == 1) {
      return (
        <View key={index} style={styles.alignCenter}>
          {renderItem(row[0], index, true)}
        </View>
      );
    } else if (row.length == 2) {
      return (
        <View key={index} style={styles.alignCenter}>
          {renderItem(row[0], index, true)}
          <View key={index + 1} style={styles.flexCol}>
            {renderItem(row[1], index + 1, false)}
          </View>
        </View>
      );
    } else if (row.length == 3) {
      return (
        <View key={index} style={styles.alignCenter}>
          {renderItem(row[0], index, true)}
          <View key={index + 1} style={styles.flexCol}>
            {renderItem(row[1], index + 1, false)}
            {renderItem(row[2], index + 2, false)}
          </View>
        </View>
      );
    }
  };
  const renderPhotoRow3 = (row: any, index: number) => {
    if (row.length == 1) {
      return (
        <View key={index} style={styles.alignCenter}>
          <View key={index} style={styles.flexCol}>
            {renderItem(row[0], index, false)}
          </View>
        </View>
      );
    } else if (row.length == 2) {
      return (
        <View key={index} style={styles.alignCenter}>
          <View key={index} style={styles.flexCol}>
            {renderItem(row[0], index, false)}
            {renderItem(row[1], index + 1, false)}
          </View>
        </View>
      );
    } else if (row.length == 3) {
      return (
        <View key={index} style={styles.alignCenter}>
          <View style={styles.flexCol}>
            {renderItem(row[0], index, false)}
            {renderItem(row[1], index + 1, false)}
          </View>
          {renderItem(row[2], index + 2, true)}
        </View>
      );
    }
  };

  const renderGrid = () => {
    return <View>{renderChunk()}</View>;
  };

  return <View style={[styles.container]}>{renderGrid()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  ImageStyle: {
    // width: View.width,
    height: 120,
    resizeMode: "cover",
  },

  flexCol: {
    flexDirection: "column",
    flex: 1,
  },
  alignCenter: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width - 20,
    paddingRight: 5,
  },

  photoView: {
    height: 120,
    flex: 2,
    backgroundColor: "gray",
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: "center",
  },
  expandedView: {
    height: 249,
    backgroundColor: "gray",
    marginHorizontal: 5,
    marginVertical: 5,
    flex: 2,
  },
  expandedImage: {
    height: 249,
  },
});

export default PhotoGrid;
