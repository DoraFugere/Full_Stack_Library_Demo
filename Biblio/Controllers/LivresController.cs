using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Biblio.Models;




namespace Biblio.Controllers
{
    public class LivresController : ApiController
    {
        private LivresDBEntities db;// = new LivresDBEntities();
        public LivresController()
        {
            db = new LivresDBEntities();
        }
        // Constructor for unit testing.
        public LivresController(LivresDBEntities moviesDbContext)
        {
            db = moviesDbContext;
        }

        // GET: api/Livres

        [HttpGet]
        //public IQueryable<Livres> GetLivres(string search = "")
        public HttpResponseMessage Get(string titre = "", string auteur = "", string isbn = "")
        {
            //return db.Livres.AsQueryable();
            //return db.Livres;
         return Request.CreateResponse(HttpStatusCode.OK,
                            db.Livres.Where(e => e.Titre.Contains(titre) & e.Auteur.Contains(auteur) & e.ISBN.Contains(isbn)));  
      
        }

        // GET: api/Livres/5
        [ResponseType(typeof(Livres))]
        public IHttpActionResult GetLivres(int id)
        {
            Livres livres = db.Livres.Find(id);
            if (livres == null)
            {
                return NotFound();
            }

            return Ok(livres);
        }

        // PUT: api/Livres/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLivres(int id, Livres livres)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != livres.LivreID)
            {
                return BadRequest();
            }

            db.Entry(livres).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LivresExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Livres
        [ResponseType(typeof(Livres))]
        public IHttpActionResult PostLivres(Livres livres)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Livres.Add(livres);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = livres.LivreID }, livres);
        }

        // DELETE: api/Livres/5
        [ResponseType(typeof(Livres))]
        public IHttpActionResult DeleteLivres(int id)
        {
            Livres livres = db.Livres.Find(id);
            if (livres == null)
            {
                return NotFound();
            }

            db.Livres.Remove(livres);
            db.SaveChanges();

            return Ok(livres);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LivresExists(int id)
        {
            return db.Livres.Count(e => e.LivreID == id) > 0;
        }
    }
}