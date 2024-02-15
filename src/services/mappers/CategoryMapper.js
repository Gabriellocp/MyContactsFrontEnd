class CategoryMapper {
  toPersistence() {
    throw Error('Not implemented ');
  }

  toDomain(persistenceCategory) {
    return {
      id: persistenceCategory.id,
      name: persistenceCategory.name,
    };
  }
}

export default new CategoryMapper();
