// This file was generated by lezer-generator. You probably shouldn't edit it.
import { LRParser } from '@lezer/lr';

import { glimmerHighlighting } from './highlight';

const spec_identifier = {
  __proto__: null,
  true: 12,
  false: 12,
  null: 14,
  undefined: 16,
  if: 20,
  let: 22,
  each: 24,
  else: 26,
  this: 40,
  as: 60,
};

export const parser = LRParser.deserialize({
  version: 14,
  states:
    "+WQQOPOOO`OPO'#CxOqOPO'#CvO|OPO'#C^OOOO'#C^'#C^O!mOPO'#DQO!uOPO'#DTOOOO'#C}'#C}OOOO'#DU'#DUQQOPOOOOOO'#Ce'#CeO!}OPO,59dOOOO'#D['#D[OqOPO,59bO`OPO'#C|OOOO,59b,59bOOOO'#Cj'#CjOOOO'#Ck'#CkO|OPO'#CnO#tOPO'#CqOOOO'#Co'#CoO#yOPO'#CaOOOO'#Ca'#CaO$_OPO'#D_O$pOPO'#C`O%OOPO,58xOOOO'#D]'#D]O%TOPO,59lOOOO,59l,59lO%]OPO,59oOOOO,59o,59oOOOO-E7S-E7SOOOO1G/O1G/OO%eOPO1G/OO%jOPO1G/OO%rOPO'#CyOOOO-E7Y-E7YOOOO1G.|1G.|O%wOPO,59hO%|OPO,59YOOOO,59],59]O&ROPO'#DVO&WOPO,59^OOOO'#DX'#DXO&lOPO'#DWO'`OPO,59yO'qOPO'#CtO'vOPO'#DgOOOO'#Cs'#CsOOOO,58z,58zOOOO1G.d1G.dOOOO-E7Z-E7ZOOOO1G/W1G/WOOOO1G/Z1G/ZOOOO7+$j7+$jO(UOPO7+$jO(ZOPO,59eOOOO1G/S1G/SOOOO1G.t1G.tOOOO,59q,59qOOOO-E7T-E7TOOOO-E7V-E7VOOOO,59r,59rOOOO-E7U-E7UO|OPO,59`O(`OPO'#DYO(hOPO,5:ROOOO<<HU<<HUO(vOPO'#DjO)OOPO1G/POOOO1G.z1G.zOOOO,59t,59tOOOO-E7W-E7WO)TOPO'#DZO)]OPO,5:UOOOO7+$k7+$kOOOO,59u,59uOOOO-E7X-E7X",
  stateData:
    ')e~ORROkPOsTOvUO~OYYOZYO[YO]YO!TYO~ORROkPOo^O~OUfOVfOWfOabOddO!SdO!U`O!VaO!WcO~P`OrlOujO~OinOujO~OUfOVfOWfOabOddOipOnsO!SdO!U`O!VaO!WcO~P`O!SxO~O!XyOiTX!UTX!YTXnTX`TX~O!Y{Oi!RX!U!RXn!RX`!RX~O!U!OOiSXnSX`SX~Oi!SO~Or!UOujO~Oi!VOujO~Oi!WO~Oi!WOnsO~O!]!YO~Oi!ZO~O`![O~O!S!]O~O!XyOifa!Ufa!Yfanfa`fa~OUfOVfOWfOabOddO!SdO!U`O!VaO!WcO!Y{O~P`O!Y{Oi!Ra!U!Ran!Ra`!Ra~O![!bO~O!Y{Oi!ZXn!ZX`!ZX~Oi!eO~O!T!fO~O!U!OO!Y{O~O!Y{Oi!Zan!Za`!Za~O!Y{O!]!^X~O!]!mO~O!T!nO!Y{O~O!Y{O!]!^a~O',
  goto: '&X!_PP!`P!h!qPPP!|PPPP#Z#ZPP#Z#bP#i#Z#p#sP#yP$P$VPP$]$cPP$gPP$g$k$q$w$}%`%f%l%rP%|PPPPPPP&RPP&USWOXT[Q]QiRQrZRwbUgRZbQ!`|R!h!bQZPYfRZb|!bRv^ZfRZb|!bZeRZb|!bZdRZb|!bR!RhQ!PhR!i!cXSOQX]XQOQX]QqZR!XrQ_QRu]TWOXTVOXQXORoXQzeR!^zQ}gR!a}S|g}U!_|!c!kS!c!P!dT!k!f!lQ!d!PR!j!dQ!l!fR!o!lQ]QRt]QkTQmUT!TkmVhRZbR!QhR!g!Y',
  nodeNames:
    '⚠ Glimmer Expression StartStache SubExpression Value BooleanLiteral null undefined Function if let each else String Number SubExpEnd SubExpStart Invocation Property this Argument PropertyPath NamedArgs Pair EndStache Block StartOpenBlockStache StartBlock As as StartCloseBlockStache EndBlock BlockComment EndLongComment StartLongComment LongComment Text StartShortComment ShortComment',
  maxTerm: 60,
  nodeProps: [
    [
      'closedBy',
      -4,
      3,
      27,
      31,
      38,
      'EndStache',
      17,
      'SubExpEnd',
      28,
      'EndBlock',
      35,
      'EndLongComment',
    ],
    [
      'openedBy',
      16,
      'SubExpStart',
      25,
      'StartStache | StartShortComment | StartOpenBlockStache | StartCloseBlockStache',
      32,
      'StartBlock',
      34,
      'StartLongComment',
    ],
  ],
  propSources: [glimmerHighlighting],
  skippedNodes: [0],
  repeatNodeCount: 8,
  tokenData:
    "0w~R!OOX$RX^$r^p$Rpq$rqr$Rrs%Sst$Rtu&puw$Rwx'rxy(yyz)Zz}$R}!O)k!O!P+Z!P!Q$R!Q![+k![!_$R!_!`,o!`!b$R!b!c-P!c!}&p!}#R$R#R#S&p#S#T$R#T#o&p#o#p-a#p#q.m#q#r.}#r#y$R#y#z$r#z$f$R$f$g$r$g#BY&p#BY#BZ/s#BZ$IS&p$IS$I_/s$I_$I|&p$I|$JO/s$JO$JT&p$JT$JU/s$JU$KV&p$KV$KW/s$KW&FU&p&FU&FV/s&FV~&p~$WRu~O#o$R#o#p$a#p~$R~$dRO#o$R#p~$R~~$m~$rOu~~$yR!Y~u~O#o$R#o#p$a#p~$R~%XTu~Or%Srs%hs#o%S#o#p%x#p~%S~%oR!U~u~O#o$R#o#p$a#p~$R~%{UOr%Srs%hs#o%S#o#p&_#p~%S~~$m~&bROr&_rs&ks~&_~&pO!U~~&y]!S~!T~u~Ot$Rtu&pu!Q$R!Q![&p![!c$R!c!}&p!}#R$R#R#S&p#S#T$R#T#o&p#o#p$a#p$g$R$g~&p~'wTu~Ow'rwx%hx#o'r#o#p(W#p~'r~(ZUOw'rwx%hx#o'r#o#p(m#p~'r~~$m~(pROw(mwx&kx~(m~)QRa~u~O#o$R#o#p$a#p~$R~)bR`~u~O#o$R#o#p$a#p~$R~)pTu~O}$R}!O*P!O#o$R#o#p$a#p~$R~*UTu~O#o$R#o#p$a#p#q$R#q#r*e#r~$R~*jTu~O#o$R#o#p$a#p#q$R#q#r*y#r~$R~+QRr~u~O#o$R#o#p$a#p~$R~+bR!X~u~O#o$R#o#p$a#p~$R~+rV!V~u~O!O$R!O!P,X!P!Q$R!Q![+k![#o$R#o#p$a#p~$R~,`T!V~u~O!Q$R!Q![,X![#o$R#o#p$a#p~$R~,vR![~u~O#o$R#o#p$a#p~$R~-WR!W~u~O#o$R#o#p$a#p~$R~-dSO#o$R#o#p-p#p~$R~~$m~-uRR~qr.Ost.c!P!Q.h~.TPv~}!O.W~.ZP}!O.^~.cOs~~.hOk~~.mOo~~.tR!]~u~O#o$R#o#p$a#p~$R~/STu~O#o$R#o#p$a#p#q$R#q#r/c#r~$R~/jRi~u~O#o$R#o#p$a#p~$R~0O]!S~!T~!Y~u~Ot$Rtu&pu!Q$R!Q![&p![!c$R!c!}&p!}#R$R#R#S&p#S#T$R#T#o&p#o#p$a#p$g$R$g~&p",
  tokenizers: [0],
  topRules: { Glimmer: [0, 1] },
  specialized: [{ term: 50, get: (value) => spec_identifier[value] || -1 }],
  tokenPrec: 0,
});
