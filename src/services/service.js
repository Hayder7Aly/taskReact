import data from "../api/data.json"



const getData = () => {

      
    const categorizedItems = {};

    data.forEach(item => {
      const categoryId = item.category ? item.category.id : 'uncategorized';
      const categoryName = item.category ? item.category.name : 'Uncategorized';
      
      if (!categorizedItems[categoryId]) {
        categorizedItems[categoryId] = {
          category: categoryName,
          items: []
        };
      }
      
      const itemData = {
        name: item.name,
        id: item.id
      };
      
      categorizedItems[categoryId].items.push(itemData);
    });
    
    // Convert the categorized items object into an array
    const categorizedList = Object.values(categorizedItems);
    return categorizedList
    
      


}

export default getData