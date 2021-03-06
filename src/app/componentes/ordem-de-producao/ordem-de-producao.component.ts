import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../serviços/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdemDeProducao } from '../../interfaces/Producao';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Component({
  selector: 'app-ordem-de-producao',
  templateUrl: './ordem-de-producao.component.html',
  styleUrls: ['./ordem-de-producao.component.css']
})
export class OrdemDeProducaoComponent implements OnInit {

  id: any;
  ordemDeProducao: any;
  dataEntrega: any;
  constructor
    (
      private firestoreService: FirestoreService,
      private router: Router,
      private route: ActivatedRoute
    ) {
    this.id = this.route.snapshot.params['id'];
    this.firestoreService.getOrdem(this.id).subscribe(ordemDeProducao => {
      this.ordemDeProducao = ordemDeProducao;
      this.dataEntrega = this.ordemDeProducao.entrega.seconds * 1000;
      console.log(this.dataEntrega);
      if (ordemDeProducao.id === this.id) {
        console.log('Já tem');
      } else {
        this.firestoreService.addIdOrdemDeProducao(this.id);
        console.log('Adicionado Agora');
      }
    });
  }

  ngOnInit() {
  }

  deleteOrdem() {
    // Deletar Ordem
    this.firestoreService.deleteOrdem();
    // Rota
    this.router.navigate(['listar-ordens-de-producao']);
  }
}
