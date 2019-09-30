using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Biblio.Controllers;
using Biblio.Models;

namespace Biblio.Tests.Controllers
{
    public class LivresSeedDataFixture : IDisposable
    {

        public LivresDBEntities LivresContext { get; private set; } = new LivresDBEntities();

        public LivresSeedDataFixture()
        {
       
            LivresContext.Livres.Add(new Livres { LivreID = '1', Titre = "Demo1", Auteur = "AteurDemo1", ISBN = "ISBNDemo1" });
            LivresContext.Livres.Add(new Livres { LivreID = '2', Titre = "Demo2", Auteur = "AteurDemo2", ISBN = "ISBNDemo2" });
            LivresContext.Livres.Add(new Livres { LivreID = '3', Titre = "Demo3", Auteur = "AteurDemo2", ISBN = "ISBNDemo3" });
            LivresContext.Livres.Add(new Livres { LivreID = '4', Titre = "Demo4", Auteur = "AteurDemo2", ISBN = "ISBNDemo4" });
            LivresContext.SaveChanges();
        }

        public void Dispose()
        {
            LivresContext.Dispose();
        }
    }
}
