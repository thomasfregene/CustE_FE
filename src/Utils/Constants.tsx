class Constants {
  static getSubfolder() {
    return import.meta.env.VITE_SUBFOLDER || '';
  }

  static getApiBaseUrl() {
    return import.meta.env.VITE_API_BASEURL;
  }

  static getTenantUrl() {
    return import.meta.env.VITE_BASEURL;
  }

  static getMapUrl() {
    return import.meta.env.VITE_MAP;
  }

  static defaultModalStyle: React.CSSProperties = {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'visible',
    zIndex: 1000,
  };
}

export default Constants;
