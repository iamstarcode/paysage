declare type PostgrestMutatorOpts<Type> = {
  /**
   * Will set all keys of the tables to stale
   */
  revalidateTables?: {
    schema?: string
    table: string
  }[]
  /**
   * Will set all keys of the tables where relation.relationIdColumn === mutatedObj.fKeyColumn to stale
   */
  revalidateRelations?: {
    schema?: string
    relation: string
    relationIdColumn: string
    fKeyColumn: keyof Type
  }[]
}
