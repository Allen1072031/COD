module.exports = (sequelize, DataTypes) => {
    return sequelize.define("gNbPerformanceRecord", {
        record_type: {
            type: DataTypes.DATE
        },
        cell_id: {
            type: DataTypes.STRING
        },
        value: {
            type: DataTypes.DECIMAL(11,10),
            allowNull: true
        },
    });
};