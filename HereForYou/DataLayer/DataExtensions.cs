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
                if (type.DataType == DataType.DateTimeOffset)
                {
                    StringBuilder.Append("timetz");
                    return;
                }
                base.BuildDataType(type, createDbType);
            }
        }
    }
}