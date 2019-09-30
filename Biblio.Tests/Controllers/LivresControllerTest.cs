using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http.Results;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Biblio.Controllers;
using Biblio.Models;
using Biblio.Tests.Controllers;
using Xunit;

namespace Biblio.Tests 
{
    [TestClass]
    public class TestLivresController : IClassFixture<LivresSeedDataFixture>
    {
      

        [TestMethod]
        public void GetProduct_ShouldReturnCorrectProduct()
        {
            var TestLivres = "Lord of the Ring";
            var controller = new LivresController();

            var result = controller.GetLivres(2) as OkNegotiatedContentResult<Livres>;
            Assert.IsNotNull(result);
            Assert.AreEqual(TestLivres, result.Content.Titre);
        }



        [TestMethod]
        public void GetProduct_ShouldNotFindProduct()
        {
            var controller = new LivresController();

            var result = controller.GetLivres(999);
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }
    }
}
