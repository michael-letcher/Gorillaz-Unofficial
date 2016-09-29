using System.Web;
using System.Web.Mvc;

namespace Gorillaz_Unofficial
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
