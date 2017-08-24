using System;
using LinqToDB;
using LinqToDB.DataProvider.PostgreSQL;
using LinqToDB.SqlProvider;
using LinqToDB.SqlQuery;

namespace HereForYou.DataLayer
{
    public static class DataExtensions
    {
        public static int InsertId<T>(this IDataContext context, T obj)
        {
            return Convert.ToInt32(context.InsertWithIdentity(obj));
        }
    }

    public class MyPostgreSQLDataProvider : PostgreSQLDataProvider
    {
        public MyPostgreSQLDataProvider(string providerName) : base(providerName, PostgreSQLVersion.v92)
        {
        }

        public override ISqlBuilder CreateSqlBuilder()
        {
            return new MyPostgresSqlBuilder(GetSqlOptimizer(), SqlProviderFlags,
                MappingSchema.ValueToSqlConverter);
        }

        public class MyPostgresSqlBuilder : PostgreSQLSqlBuilder
        {
            public MyPostgresSqlBuilder(ISqlOptimizer sqlOptimizer, SqlProviderFlags sqlProviderFlags,
                ValueToSqlConverter valueToSqlConverter) : base(sqlOptimizer, sqlProviderFlags, valueToSqlConverter)
            {
            }

            protected override void BuildDataType(SqlDataType type, bool createDbType)
            {
                switch (type.DataType)
                {
                    case DataType.DateTimeOffset:
                        StringBuilder.Append("TimeStampTZ");
                        return;
                    case DataType.Guid:
                        StringBuilder.Append("uuid");
                        return;
                }
                base.BuildDataType(type, createDbType);
            }
        }
    }
}