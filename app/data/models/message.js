module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define('message', {
    messageId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sbi: DataTypes.INTEGER,
    agreementNumber: DataTypes.STRING,
    message: DataTypes.JSON,
    statusId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    tableName: 'messages',
    freezeTableName: true
  })
  return payment
}
