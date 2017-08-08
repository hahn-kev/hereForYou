using System;
using LinqToDB;

namespace HereForYou.DataLayer
{
    public static class DataExtensions
    {
        public static int InsertId<T>(this IDataContext context, T obj)
        {
            return Convert.ToInt32(context.InsertWithIdentity(obj));
        }
    }
}