function ellipseAddress(address = '', width = 8) {
  if (!address) {
    return '';
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

export default ellipseAddress;
