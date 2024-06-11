create database ArtCare;
use ArtCare;

create table endereco (
	idEndereco int primary key auto_increment,
    cep char(9) not null,
    numEnd varchar(45) not null,
    complemento varchar(60)
);

create table museu (
	idMuseu int primary key auto_increment,
    fkEndereco int,
    nome varchar(45) not null,
    cnpj char(14) not null unique,
    rm char(9) not null unique,
    constraint fkEnderecoCliente foreign key (fkEndereco) references endereco (idEndereco)
);
create table sensor (
	idSensor int primary key auto_increment,
    nome char(5) default 'dht11',
    tipo varchar(45) default 'temperatura, umidade',
    constraint chkNomeSensor check (nome in ('dht11'))
);
create table setor (
	idSetor int primary key auto_increment,
    fkSensor int,
    fkMuseu int,
    nome varchar(45) not null,
    andar varchar(45) not null,
    statusSetor int,
    constraint fkSensorDoSetor foreign key (fkSensor) references sensor (idSensor),
    constraint fkMuseuDoSetor foreign key (fkMuseu) references museu (idMuseu)
);

ALTER TABLE setor add COLUMN dtStatus time;

create table verificacao (
	idVerificacao int primary key auto_increment,
    tempMax decimal(4,2) not null,
    tempMin decimal(4,2) not null,
    umiMax decimal(4,2) not null,
    umiMin decimal(4,2) not null,
    fkSetor int,
    foreign key(fkSetor) references setor(idSetor)
);

create table representante (
idRepresentante int primary key auto_increment,
fkMuseu int,
foreign key (fkMuseu) references museu(idMuseu),
nome varchar(45) not null,
email varchar(256) not null,	 	
senha varchar(45) not null
);



create table supervisor (
	idSupervisor int primary key auto_increment,
    nome varchar(45) not null,
    email varchar(256) not null,
    senha varchar(45) not null,
	fkMuseu int,
    foreign key (fkMuseu) references museu(idMuseu)
);



create table visualizacao (
idVisualizacao int auto_increment,
fkSetor int,
fkSupervisor int,
fkMuseu int,
	constraint pkCompostaVisualizacao primary key (idVisualizacao, fkSetor, fkSupervisor, fkMuseu),
    foreign key (fkSetor) references setor(idSetor),
    foreign key (fkSupervisor) references supervisor(idSupervisor),
    foreign key (fkMuseu) references museu(idMuseu),
dtVisualizacao timestamp not null default current_timestamp
);

create table registro (
	idRegistro int auto_increment,
    fkSensor int,
    umidade decimal(4,2),
    temperatura decimal(4,2),
    dtRegistro timestamp not null default current_timestamp,
    constraint pkCompostaRegistro primary key (idRegistro, fkSensor),
    constraint fkSensorRegistro foreign key (fkSensor) references sensor (idSensor)
);

create table relatorio(
	idRelatorio int auto_increment,
    fkSetor int,
	statusSetor varchar(45),
    dtRelatorio timestamp not null default current_timestamp,
    temperatura decimal(4,2),
    umidade decimal(4,2),
    foreign key (fkSetor) references setor(idSetor),
    primary key (idRelatorio, fkSetor)
    );

insert into sensor (nome, tipo) values ("DHT11", "Temperatura e Umidade"); 

SELECT idMuseu FROM museu ORDER BY idMuseu DESC LIMIT 1;

delete from museu where idMuseu = 15;
select * from museu;
select idSetor, nome, statusSetor from setor order by statusSetor DESC;


select * from setor where statusSetor = 3;
select count(statusSetor) from setor where statusSetor = 2;

select round((umidade),0), round((temperatura),0) from setor join sensor on setor.fkSensor = idSensor join registro on registro.fkSensor = idSensor where idSetor = 3 order by idRegistro DESC limit 1;

select max(temperatura) from setor join registro on setor.fkSensor = registro.fkSensor;

select * from museu;
select * from endereco;
select * from supervisor;
select * from representante; 
select * from setor;
select * from sensor;
select count(idRegistro) from registro;
select temperatura from registro;
select * from visualizacao;
select idSetor, nome, statusSetor from setor where fkMuseu = 1 order by statusSetor DESC;
SELECT idSupervisor, nome, email, senha, fkMuseu FROM supervisor;
truncate registro;
update setor set statusSetor = 3 where idSetor = 2;
select * from verificacao;


select supervisor.nome, setor.nome, dtVisualizacao from supervisor join visualizacao on idSupervisor = fkSupervisor join setor on fkSetor = idSetor where visualizacao.fkMuseu = 2;

insert into relatorio (fkSetor, statusSetor, temperatura, umidade) values (
1, "Critico", 26.5, 44
);

select * from relatorio;
truncate relatorio;

select nome, count(idRelatorio) as quantidade from relatorio join setor on fkSetor = idSetor where relatorio.statusSetor = 'Alerta' and fkMuseu = 1 group by nome order by quantidade desc limit 5;
select count(distinct(date(dtRelatorio))) from relatorio where statusSetor = 'Alerta';

select 
setor.nome as Setor, 
relatorio.statusSetor as Status, 
relatorio.dtRelatorio as DataHora,
verificacao.tempMax as MaximoDeTemperatura, 
verificacao.tempMin as MinimoDeTemperatura, 
verificacao.umiMax as MaximoDeUmidade, 
verificacao.umiMin as MinimoDeUmidade,
relatorio.temperatura as temperaturaCapturada, 
relatorio.umidade as umidadeCapturada
from relatorio join setor on relatorio.fkSetor = setor.idSetor 
join verificacao on verificacao.fkSetor = setor.idSetor;


