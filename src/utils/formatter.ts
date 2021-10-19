export const currencyFormatter = (value: number | string): string => {
    const currency = value.toString();
  
    const _index = currency.indexOf(".");
  
    if (_index > -1) {
      return `R$ ${currency.replace(".", ",")}`;
    }
    return `R$ ${currency},00`;
  };
  